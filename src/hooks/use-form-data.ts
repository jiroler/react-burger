import { FormEvent, useState } from 'react'

export default function useFormData<TState extends {[key: string]: string}>(initialState: TState, onSubmit: (formData: TState) => void) {

    const [formData, setFormData] = useState<TState>(initialState)

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (typeof onSubmit === 'function') {
            onSubmit(formData)
        }
    }

    return { formData, setFormData, handleChange, handleSubmit }
}
