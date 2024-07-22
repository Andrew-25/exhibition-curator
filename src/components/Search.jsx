import { useEffect, useState } from "react";
import { fetchScienceMuseum, fetchVam } from "../apis/fetch";
import Result from "./Result";
import { useNavigate } from "react-router-dom";

const Search = () => {
    let navigate = useNavigate()
    const [searchResults, setSeachResults] = useState([])

    useEffect(() => {
        const fetchRequests = async () => {
            const scienceData = await fetchScienceMuseum('/search/objects?page[size]=10')
            const vamData = await fetchVam('/objects/search?page_size=10&images_exist=1')
            setSeachResults([...scienceData, ...vamData.records])
        }
        fetchRequests()
    }, [])

    if (searchResults.length === 0) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    } else {
        return (
            <div className="Search">
              <h1>Search results</h1>
              <button onClick={() => navigate('/')}>Home</button>
              <button onClick={() => navigate('/collection')}>Your Collection</button>
              <ul>
                {searchResults.map((res) => {
                    if (res.systemNumber) return <Result result={res} key={res.systemNumber}/>
                    else return <Result result={res} key={res.id}/>
                })}
              </ul>
            </div>
          );
    }

}

export default Search