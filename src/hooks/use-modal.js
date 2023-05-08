import { useCallback, useState } from 'react'

export default function useModal(initialState = false) {
    const [isVisible, setIsVisible] = useState(initialState)

    const open = useCallback(() => {
        setIsVisible(true)
    }, [])

    const close = useCallback(() => {
        setIsVisible(false)
    }, [])

    return [isVisible, open, close]
}
