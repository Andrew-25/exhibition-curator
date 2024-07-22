import { createContext, useState } from "react";

export const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const [state, setState] = useState([
    {
      id: 'example',
      name: 'example name',
      description: 'example description',
      imageLink: 'broken link',
      imageAlt: 'example image alt',
      museum: 'example museum',
      curatorWebsite: true
    }
  ]);

  return (
    <CollectionContext.Provider value={{ state, setState }}>
      {children}
    </CollectionContext.Provider>
  );
};
