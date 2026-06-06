import profilePic from '../assets/profile.png'
import './About.css'

function About() {
    return (
        <div className="about">

            <h1>About Me</h1>

            <img
                src={profilePic}
                alt="Samuel Garcia"
                className="profilePic"
            />

            <h2>Samuel Alejandro Garcia Felipe</h2>

            <p>
                I am a Software Engineering student with a strong interest in
                web development, Java programming, databases, and software
                testing. I enjoy learning new technologies and applying my
                knowledge to practical projects that improve my technical
                skills and problem-solving abilities.
            </p>

            <a
                href="/Samuel_Garcia_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="resumeButton"
            >
                View Resume
            </a>

        </div>
    )
}

export default About