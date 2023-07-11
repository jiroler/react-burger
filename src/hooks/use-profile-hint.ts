import { useOutletContext } from 'react-router-dom'

export const useProfileHint = () => {
    return useOutletContext<{setHint:(hint: string) => void}>()
}
