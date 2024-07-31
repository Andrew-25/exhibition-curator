import { useContext, useEffect, useState } from "react";
import { CollectionContext } from "../CollectionContext";
import './css/Result.css'

const Result = ({result, listKey, yourCollection, setYourCollection}) => {
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
                imgAlt: 'alt',
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
    }, [])
    
    const handleCollectionClick = () => {
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
    }

    const handleExhibitionClick = () => {
        if (inExhibition) {
            setInExhibition(false)
            const newCollection = state.map((c) => {
                if (c.id === listKey) c.inExhibition = false
                return c
            })
            setState(newCollection)
        } else {
            setInExhibition(true)
            const newCollection = [...state].map((c) => {
                if (c.id === listKey) c.inExhibition = true
                return c
            })
            setState(newCollection)
        }
    }

    if (result.curatorWebsite) {
        return (
            <li key={listKey} className="result">
                <h3>{resDetails.title}</h3>
                <p>{resDetails.description}</p>
                <p>{resDetails.museum}</p>
                <img src={resDetails.imgLink} alt={resDetails.imgAlt} />
                <button onClick={handleCollectionClick}>{inCollection ? 'Remove from collection' : 'Add to collection'}</button>
                <button onClick={handleExhibitionClick}>{inExhibition ? 'Remove from exhibition' : 'Add to exhibition'}</button>
            </li>
        )
    } else {
        return (
            <li key={listKey} className="result">
                <h3>{resDetails.title}</h3>
                <p>{resDetails.description}</p>
                <p>{resDetails.museum}</p>
                <img src={resDetails.imgLink} alt={resDetails.imgAlt} />
                <button onClick={handleCollectionClick}>{inCollection ? 'Remove from collection' : 'Add to collection'}</button>
            </li>
        )
    }
}

export default Result