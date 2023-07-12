
import type { Middleware, MiddlewareAPI } from 'redux'
import { TAppDispatch, TRootState } from '../store'
import { connectionClose, connectionError, connectionStart, connectionSuccess, getMessage, sendMessage } from '../slices/socket'

export const socketMiddleware = (): Middleware => {
    return ({ dispatch }: MiddlewareAPI<TAppDispatch, TRootState>) => {
        let socket: WebSocket | null = null

        return next => (action: {type: string}) => {
            if (action.type === connectionStart.type) {
                const { payload } = action as ReturnType<typeof connectionStart>
                socket = new WebSocket(payload.url)
            }

            if (socket) {
                socket.onopen = () => dispatch(connectionSuccess())
                socket.onclose = () => dispatch(connectionClose())
                socket.onerror = event => dispatch(connectionError(event))
                socket.onmessage = event => dispatch(getMessage({ data: JSON.parse(event.data) }))

                if (action.type === sendMessage.type) {
                    const { payload } = action as ReturnType<typeof sendMessage>
                    socket.send(JSON.stringify(payload.data))
                }
            }

            next(action)
        }
    }
}
