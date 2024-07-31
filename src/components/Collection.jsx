import { useContext, useEffect, useState } from "react";
import { CollectionContext } from "../CollectionContext";
import Result from "./Result";
import Nav from "./Nav";
import './css/Collection.css'

const Collection = () => {
    const [yourCollection, setYourCollection] = useState([])
    const [showingExhibition, setShowingExhibition] = useState(false)
    const { state, setState } = useContext(CollectionContext)

    useEffect(() => {
        if (showingExhibition) setYourCollection(state.filter((i) => i.inExhibition === true))
        else setYourCollection(state)
    }, [yourCollection, showingExhibition])

    if (yourCollection.length === 0) {
        return (
            <div className="collection">
                <Nav />
                <h1>Your {showingExhibition ? 'Exhibition' : 'Collection'}</h1>
                <button onClick={() => setShowingExhibition(!showingExhibition)}>Show {showingExhibition ? 'Collection' : 'Exhibition'}</button>
                <h2>You have no items in you {showingExhibition ? 'Exhibition' : 'Collection'}.</h2>
            </div>
        )
    } else {
        return (
            <div className="collection">
                <Nav />
                <h1>Your {showingExhibition ? 'Exhibition' : 'Collection'}</h1>
                <button onClick={() => setShowingExhibition(!showingExhibition)}>Show {showingExhibition ? 'Collection' : 'Exhibition'}</button>
                <ul>
                    {yourCollection.map((res) => {
                        return <Result result={res} listKey={res.id} key={res.id} yourCollection={yourCollection} setYourCollection={setYourCollection}/>
                    })}
                </ul>
            </div>
        )   
    }

}

export default Collection