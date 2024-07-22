import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Collection from "./components/Collection";
import { CollectionProvider } from "./CollectionContext";

function App() {
  return (
    <>
      <CollectionProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search/:search_term" element={<Search />}></Route>
          <Route path="/collection" element={<Collection />}></Route>
        </Routes>
      </CollectionProvider>
    </>
  );
}

export default App;
