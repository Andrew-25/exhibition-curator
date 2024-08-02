import { useCallback, useContext, useEffect, useState } from "react";
import { CollectionContext } from "../CollectionContext";
import Result from "./Result";
import Nav from "./Nav";
import './css/Collection.css'

const Collection = () => {
    const [yourCollection, setYourCollection] = useState([])
    const [showingExhibition, setShowingExhibition] = useState(false)
    const { state } = useContext(CollectionContext)

    useEffect(() => {
        if (showingExhibition) setYourCollection(state.filter((i) => i.inExhibition === true))
        else setYourCollection(state)
    }, [state, showingExhibition])

    const handleShowExhibition = useCallback(() => {
        setShowingExhibition((p) => !p)
    }, [])

    return (
        <div className="collection">
            <Nav />
            <h1>Your {showingExhibition ? 'Exhibition' : 'Collection'}</h1>
            <button onClick={handleShowExhibition}>Show {showingExhibition ? 'Collection' : 'Exhibition'}</button>
            {yourCollection.length === 0 ? 
                <h2>You have no items in you {showingExhibition ? 'Exhibition' : 'Collection'}.</h2> :
                <ul>
                    {yourCollection.map((res) => {
                        return <Result result={res} listKey={res.id} key={res.id} yourCollection={yourCollection} setYourCollection={setYourCollection}/>
                    })}
                </ul>
            }
        </div>
    )   
}

export default Collection