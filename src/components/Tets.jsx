import { useContext } from "react";
import { CollectionContext } from "../CollectionContext";


const Tets = () => {
  const { state, setState } = useContext(CollectionContext);

  return (
    <div>
      <h1>Tets</h1>
      <p>value {state}</p>
      <button onClick={() => setState("Aloha")}>Button</button>
    </div>
  );
};

export default Tets;
