import { createContext, useState } from "react";

export const CollectionContext = createContext()

export const CollectionProvider = ({ children }) => {
    const [state, setState] = useState('Hello')

    return (
        <CollectionContext.Provider value={{ state, setState }}>
            {children}
        </CollectionContext.Provider>
    )
}