import { useContext } from "react";
import { CollectionContext } from "../CollectionContext";
import { useNavigate } from "react-router-dom";

const Test = () => {
  let navigate = useNavigate();
  const { state, setState } = useContext(CollectionContext);

  return (
    <div>
      <h1>Tets</h1>
      <p>value {state[0].id}</p>
      <button onClick={() => setState("Aloha")}>Button</button>
      <button onClick={() => navigate("/")}>home</button>
    </div>
  );
};

export default Test;
