import './Home.css'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="home">

            <h1>Samuel Garcia</h1><br></br>

            <h2>Software Engineering Student</h2>

            <p>
                Welcome to my portfolio website. Here you can learn more about my projects,
                skills, and experience in software development.
            </p>

            <h3>Mission Statement</h3>

            <p>
                My mission is to grow as a software developer by applying my knowledge to
                real-world projects, learning new technologies, and delivering high-quality
                solutions through continuous improvement.
            </p>

            <Link to="/about" className="aboutButton">
                Learn More About Me
            </Link>

        </div>
    )
}

export default Home