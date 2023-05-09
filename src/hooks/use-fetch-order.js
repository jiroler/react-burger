import { useCallback, useState } from 'react'

export default function useFetchOrder(url, ingredients, onLoad) {

    const [state, setState] = useState({
        data: null,
        isLoading: false,
        error: null
    })

    const fetchData = useCallback(async () => {
        try {
            setState({ ...state, isLoading: true })
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredients })
            })

            if (response.ok) {
                const json = await response.json()
                if (! json.success) throw new Error(json.message)

                setState({ ...state, error: null, isLoading: false, data: json })
                typeof onLoad === 'function' && onLoad()
            } else {
                throw new Error(`Ошибка ${response.status}`)
            }
        } catch (error) {
            const errorMessage = error?.message || 'Ошибка загрузки'
            setState({ ...state, isLoading: false, error: errorMessage })
        }
    }, [url, ingredients])

    return { data: state.data, isLoading: state.isLoading, error: state.error, fetchData }
}
