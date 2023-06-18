import { useState } from 'react'

export default function useFormData(initialState = {}, onSubmit = null) {

    const [formData, setFormData] = useState(initialState)

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (typeof onSubmit === 'function') {
            onSubmit(formData)
        }
    }

    return { formData, setFormData, handleChange, handleSubmit }
}
