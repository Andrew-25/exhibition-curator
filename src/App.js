import './App.css';
import { Route , Routes } from 'react-router-dom'
import Home from './components/Home'
import Search from './components/Search'
import Collection from './components/Collection'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search/:search_term" element={<Search />}></Route>
        <Route path="/collection" element={<Collection />}></Route>
      </Routes>
    </>
  );
}

export default App;
