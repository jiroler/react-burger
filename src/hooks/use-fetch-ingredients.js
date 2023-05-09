import { useCallback, useEffect, useState } from 'react'

export default function useFetchIngredients(url) {

    const [state, setState] = useState({
        data: [],
        isLoaded: false,
        error: null
    })

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(url)
            if (response.ok) {
                const json = await response.json()
                setState({ ...state, isLoaded: true, data: json.data })
            } else {
                throw new Error(`Ошибка ${response.status}`)
            }
        } catch (error) {
            const errorMessage = error?.message || 'Ошибка загрузки'
            setState({ ...state, error: errorMessage })
        }
    }, [url])

    useEffect(() => {
        fetchData()
    }, [])

    return { data: state.data, isLoaded: state.isLoaded, error: state.error }
}
