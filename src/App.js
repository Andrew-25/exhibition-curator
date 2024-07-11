import './App.css';
import { Route , Routes } from 'react-router-dom'
import Home from './components/Home'
import Search from './components/Search';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search/:search_term" element={<Search />}></Route>
      </Routes>
    </>
  );
}

export default App;
