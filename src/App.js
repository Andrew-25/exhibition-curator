import "./App.css";
import { CollectionProvider } from "./CollectionContext";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Collection from "./components/Collection";
import Object from "./components/Object";

function App() {
  return (
    <>
      <CollectionProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search/:search_term" element={<Search />}></Route>
          <Route path="/collection" element={<Collection />}></Route>
          <Route path="/object/:object_id" element={<Object />}></Route>
        </Routes>
      </CollectionProvider>
    </>
  );
}

export default App;
