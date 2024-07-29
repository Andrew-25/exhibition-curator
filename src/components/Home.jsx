import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css'

const Home = () => {
    let navigate = useNavigate()
    const [searchTerm, setSearch] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!searchTerm) navigate(`/search/all`)
        else navigate(`/search/${searchTerm}`)
    }

    return (
        <div className="home">
          <div className="nav">
            <button onClick={() => navigate('/collection')}>Your Collection</button>
          </div>
          <h1>Exhibition Curator</h1>
          <form onSubmit={(e) => handleSubmit(e)} className="searchForm">
            <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} value={searchTerm} />
            <button>Search</button>
          </form>
        </div>
      );
}

export default Home