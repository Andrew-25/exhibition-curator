import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    let navigate = useNavigate()
    const [searchTerm, setSearch] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!searchTerm) navigate(`/search/all`)
        else navigate(`/search/${searchTerm}`)
    }

    return (
        <div className="Home">
          <h1>Exhibition Curator</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} value={searchTerm} />
            <button>Search</button>
          </form>
          <button onClick={() => navigate('/collection')}>Your Collection</button>
        </div>
      );
}

export default Home