import { createContext, useContext, useMemo, useState } from 'react'

type TContext = {
    setModalTitle: (title: string) => void
}

export const ModalContext = createContext<TContext>({ setModalTitle: () => {} })

/** Set modal title from child component */
export const useModalTitle = () => {
    const [title, setTitle] = useState('')

    const contextValue = useMemo(() => {
        return { setModalTitle: setTitle }
    }, [setTitle])

    const { setModalTitle } = useContext<TContext>(ModalContext)

    return { contextValue, title, setModalTitle }
}
