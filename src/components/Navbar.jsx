import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../assets/SG_Logo.png'

function Navbar() {
    return (
        // Website navigation links
        <nav>
            <img src={logo} alt="SG Logo" className="logo" />

            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/references">References</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar