import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

/** Set profile hint from outlet */
export const useProfileHint = () => {
    const [hint, setHint] = useState('')

    const contextValue = useMemo(() => {
        return { setHint }
    }, [setHint])

    const setHintByContext = useOutletContext<{setHint:(hint: string) => void}>()?.setHint

    return { contextValue, hint, setHint: setHintByContext }
}
