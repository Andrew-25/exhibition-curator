import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionContext } from "../CollectionContext";
import Result from "./Result";

const Collection = () => {
    let navigate = useNavigate()
    const [yourCollection, setYourCollection] = useState([])
    const { state, setState } = useContext(CollectionContext)

    useEffect(() => {
        setYourCollection(state)
    }, [yourCollection])

    if (yourCollection.length === 0) {
        return (
            <div>
                <h1>Your Collection</h1>
                <button onClick={() => navigate('/')}>Home</button>
                <h3>You have no items in you collection.</h3>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Your Collection</h1>
                <button onClick={() => navigate('/')}>Home</button>
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