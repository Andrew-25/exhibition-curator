import { useNavigate } from "react-router-dom"
import './Nav.css'

const Nav = () => {
    let navigate = useNavigate()

    return (
        <div className="nav">
            <button onClick={() => navigate('/')}>Home</button>
            <button onClick={() => navigate('/collection')}>Your Collection</button>
        </div>
    )
}

export default Nav