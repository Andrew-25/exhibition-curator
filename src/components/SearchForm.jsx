import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './css/SearchForm.css'

const SearchForm = () => {
    let navigate = useNavigate()
    const [searchTerm, setSearch] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!searchTerm) navigate(`/search/all`)
        else navigate(`/search/${searchTerm}`)
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="searchForm">
            <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} value={searchTerm} />
            <button>Search</button>
        </form>
    )
}

export default SearchForm