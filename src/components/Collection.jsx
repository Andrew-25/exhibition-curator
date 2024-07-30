import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionContext } from "../CollectionContext";
import Result from "./Result";
import Nav from "./Nav";
import './css/Collection.css'

const Collection = () => {
    let navigate = useNavigate()
    const [yourCollection, setYourCollection] = useState([])
    const { state, setState } = useContext(CollectionContext)

    useEffect(() => {
        setYourCollection(state)
    }, [yourCollection])

    if (yourCollection.length === 0) {
        return (
            <div className="collection">
                <Nav />
                <h1>Your Collection</h1>
                <h3>You have no items in you collection.</h3>
            </div>
        )
    } else {
        return (
            <div className="collection">
                <Nav />
                <h1>Your Collection</h1>
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