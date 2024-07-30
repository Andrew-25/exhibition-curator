import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchScienceMuseum, fetchVam } from "../apis/fetch";
import Result from "./Result";
import Nav from "./Nav";
import SearchForm from "./SearchForm";
import './css/Search.css'

const Search = () => {
    let location = useLocation()
    const [searchResults, setSearchResults] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loadingNextPage, setLoadingNextPage] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let scienceSearch = `/search/objects?page[size]=10&page[number]=${pageNo - 1}`
        let vamSearch = `/objects/search?page_size=10&images_exist=1&page=${pageNo}`
        
        if (location.pathname.slice(8) !== 'all') {
            scienceSearch += `&q=${location.pathname.slice(8)}`
            vamSearch += `&q=${location.pathname.slice(8)}`
        }
        
        const fetchRequests = async () => {
            setIsLoading(true)
            const scienceData = await fetchScienceMuseum(scienceSearch)
            const vamData = await fetchVam(vamSearch)

            if (!scienceData && !vamData) setSearchResults([])
            else if (!scienceData) setSearchResults(vamData.records)
            else if (!vamData) setSearchResults(scienceData.data)
            else setSearchResults([...scienceData.data, ...vamData.records])

            setTotalPages(Math.max(scienceData.meta.total_pages, vamData.info.pages))
            setLoadingNextPage(false)
            setIsLoading(false)
        }
        fetchRequests()
    }, [pageNo, location])

    const prevPage = () => {
        if (!loadingNextPage) {
            setPageNo(pageNo - 1)
            setLoadingNextPage(true)
        }
    }
    const nextPage = () => {
        if (!loadingNextPage) {
            setPageNo(pageNo + 1)
            setLoadingNextPage(true)
        }
    }

    if (isLoading) {
        return (
            <div className="search">
                <Nav />
                <h2>Loading...</h2>
            </div>
        )
    } else if (searchResults.length === 0 && !isLoading) {
        return (
            <div className="search">
                <Nav />
                <h1>Search results</h1>
                <SearchForm />
                <h2>No results for {location.pathname.slice(8)}.</h2>
            </div>
        )
    } else {
        return (
            <div className="search">
              <Nav />
              <h1>Search results</h1>
              <SearchForm />
              <button hidden={pageNo < 2} onClick={() => prevPage()}>Prev</button>
              <p>Page: {`${pageNo}/${totalPages}`}</p>
              <button hidden={pageNo === totalPages} onClick={() => nextPage()}>Next</button>
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