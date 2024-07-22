import { createContext, useState } from "react";

export const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const [state, setState] = useState([
    {
      id: 'example',
      name: 'example name',
      description: 'example description',
      imageLink: 'value',
      imageAlt: 'example image alt'
    }
  ]);

  return (
    <CollectionContext.Provider value={{ state, setState }}>
      {children}
    </CollectionContext.Provider>
  );
};
