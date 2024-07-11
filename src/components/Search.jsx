import { useEffect, useState } from "react";
import { fetchScienceMuseum } from "../apis/fetch";
import Result from "./Result";

const Search = () => {
    const [searchResults, setSeachResults] = useState([])

    useEffect(() => {
        fetchScienceMuseum('/search/objects').then((res) => {
            setSeachResults(res)
        })
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
              <ul>
                {searchResults.map((res) => {
                    return <Result result={res} key={res.id}/>
                })}
              </ul>
            </div>
          );
    }

}

export default Search