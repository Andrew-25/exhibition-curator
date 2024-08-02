import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionContext } from "../CollectionContext";
import './css/Result.css'

const Result = ({result, listKey, yourCollection, setYourCollection}) => {
    let navigate = useNavigate()
    const [resDetails, setResDetails] = useState({})
    const { state, setState } = useContext(CollectionContext)
    const [inCollection, setInCollection] = useState(false)
    const [inExhibition, setInExhibition] = useState(false)

    useEffect(() => {
        setInCollection(state.some(c => c.id === listKey))
        if (result.systemNumber) {
            setResDetails({
                title: result['_primaryTitle'],
                description: result.objectType,
                imgLink: result['_images']['_primary_thumbnail'],
                imgAlt: result['_primaryTitle'],
                museum: 'Victoria and Albert'
            })
        } else if (result.curatorWebsite) {
            setInExhibition(result.inExhibition)
            setResDetails({
                title: result.name,
                description: result.description,
                imgLink: result.imageLink,
                imgAlt: result.imageAlt,
                museum: result.museum,
                inExhibition: result.inExhibition
            })
        } else {
            let imgLink = 'no image'
            if (result.attributes.multimedia) imgLink = `https://coimages.sciencemuseumgroup.org.uk/${result.attributes.multimedia[0]['@processed'].medium_thumbnail.location}`
            setResDetails({
                title: result.attributes.description[0].value,
                description: result.attributes.category[0].name,
                imgLink: imgLink,
                imgAlt: result.attributes.description[0].value,
                museum: 'Science Museum Group'
            })
        }
    }, [state, result, listKey])

    const handleCollectionClick = useCallback(() => {
        if (inCollection) {
            setInCollection(false)
            setYourCollection(yourCollection.filter(c => c.id !== listKey))
            setState(state.filter(c => c.id !== listKey))
        } else {
            setInCollection(true)
            const newObject = {
                id: listKey,
                name: resDetails.title,
                description: resDetails.description,
                imageLink: resDetails.imgLink,
                imageAlt: resDetails.imgAlt,
                museum: resDetails.museum,
                curatorWebsite: true,
                inExhibition: false
            }
            setState([...state, newObject])
        }
    }, [inCollection, listKey, resDetails, setYourCollection, state, setState, yourCollection])

    const handleExhibitionClick = useCallback(() => {
        setInExhibition(!inExhibition)
        setState(state.map((c) => {
            if (c.id === listKey) c.inExhibition = !inExhibition
            return c
        }))
    }, [inExhibition, listKey, state, setState])

    return (
        <li key={listKey} className="result">
            <h3 onClick={() => navigate(`/object/${listKey}`)}>{resDetails.title}</h3>
            <p>{resDetails.description}</p>
            <p>{resDetails.museum}</p>
            <img src={resDetails.imgLink} alt={resDetails.imgAlt} />
            <button onClick={handleCollectionClick}>{inCollection ? 'Remove from collection' : 'Add to collection'}</button>
            {result.curatorWebsite ? 
                <button onClick={handleExhibitionClick}>{inExhibition ? 'Remove from exhibition' : 'Add to exhibition'}</button> : null
            }
        </li>
    )
}

export default Result