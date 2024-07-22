import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionContext } from "../CollectionContext";

const Collection = () => {
    let navigate = useNavigate()
    const [yourCollection, setYourCollection] = useState([])
    const { state, setState } = useContext(CollectionContext);

    useEffect(() => {
        setYourCollection(state)
    }, [])

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
                        return (
                            <li key={res.id}>
                                <h3>{res.name}</h3>
                                <p>{res.description}</p>
                                <img src={res.imageLink} alt={res.imageAlt} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )   
    }

}

export default Collection