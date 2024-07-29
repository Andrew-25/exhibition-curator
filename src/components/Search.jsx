import { useEffect, useState } from "react";
import { fetchScienceMuseum, fetchVam } from "../apis/fetch";
import Result from "./Result";
import { useLocation, useNavigate } from "react-router-dom";
import './Search.css'

const Search = () => {
    let navigate = useNavigate()
    let location = useLocation()
    const [searchResults, setSearchResults] = useState([])
    const [pageNo, setPageNo] = useState(1)

    useEffect(() => {
        let scienceSearch = `/search/objects?page[size]=10&page[number]=${pageNo - 1}`
        let vamSearch = `/objects/search?page_size=10&images_exist=1&page=${pageNo}`
        
        if (location.pathname.slice(8) !== 'all') {
            scienceSearch += `&q=${location.pathname.slice(8)}`
            vamSearch += `&q=${location.pathname.slice(8)}`
        }
        
        const fetchRequests = async () => {
            const scienceData = await fetchScienceMuseum(scienceSearch)
            const vamData = await fetchVam(vamSearch)
            setSearchResults([...scienceData, ...vamData.records])
        }
        fetchRequests()
    }, [pageNo])

    const prevPage = () => setPageNo(pageNo - 1)
    const nextPage = () => setPageNo(pageNo + 1)

    if (searchResults.length === 0) {
        return (
            <div className="search">
                <h1>Loading...</h1>
            </div>
        )
    } else {
        return (
            <div className="search">
              <div className="nav">
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/collection')}>Your Collection</button>
              </div>
              <h1>Search results</h1>
              <button hidden={pageNo < 2} onClick={() => prevPage()}>Prev</button>
              <p>Page: {pageNo}</p>
              <button onClick={() => nextPage()}>Next</button>
              <ul>
                {searchResults.map((res) => {
                    if (res.systemNumber) return <Result result={res} listKey={res.systemNumber} key={res.systemNumber}/>
                    else return <Result result={res} listKey={res.id} key={res.id}/>
                })}
              </ul>
            </div>
          );
    }

}

export default Search