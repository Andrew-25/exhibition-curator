import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchScienceMuseum, fetchVam } from "../apis/fetch"
import Nav from "./Nav"
import './css/Object.css'

const Object = () => {
    let location = useLocation()
    const [objectData, setObjectData] = useState({})
    const [museum, setMuseum] = useState('loading')

    useEffect(() => {
        const fetchRequest = async () => {
            if (location.pathname.slice(8, 9) === 'O') {
                const vamObject = await fetchVam(`/museumobject/${location.pathname.slice(8)}`)
                setObjectData(vamObject.record)
                setMuseum('Victoria and Albert')
            } else {
                const scienceObject = await fetchScienceMuseum(`/objects/${location.pathname.slice(8)}`)
                setObjectData(scienceObject.data)
                setMuseum('Science Museum Group')
            }
        }
        fetchRequest()
    }, [])

    if (museum === 'Science Museum Group') {
        return (
            <div className="object">
                <Nav />
                <h1>{objectData.attributes.description[0].value}</h1>
                <div className="centered"><img
                    src={`${objectData.attributes.multimedia[0]['@processed'].large.location}`}
                    alt={objectData.attributes.description[0].value}
                /></div>
                <h3>{museum}</h3>
                <p>{objectData.attributes.category[0].name}</p>
            </div>
        )
    } else if (museum === 'Victoria and Albert') {
        return (
            <div className="object">
                <Nav />
                <h1>{objectData['_primaryTitle']}</h1>
                <div className="centered"><img
                    src={objectData['_images']['_primary_thumbnail']}
                    alt={objectData['_primaryTitle']}
                /></div>
                <h3>{museum}</h3>
                <p>{objectData.objectType}</p>
            </div>
        )
    } else {
        return (
            <div className="object">
                <Nav />
                <h2>Loading...</h2>
            </div>
        )
    }
}

export default Object