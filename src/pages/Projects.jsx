import project1 from "../assets/project1.jpg";
import project2 from "../assets/project2.jpg";
import project3 from "../assets/project3.jpg";
import "./Project.css";

function Projects() {
  return (
    <div className="projects">

      <h1>Projects</h1>

      <div className="project-card">
        <img src={project1} alt="Food Delivery System" />
        <h2>Food Delivery Management System</h2>
        <p>
          Developed a Java application to manage riders, deliveries,
          and customer orders.
        </p>
        <p><strong>Completion Date:</strong> May 2026</p>
      </div>

      <div className="project-card">
        <img src={project2} alt="Registration Form" />
        <h2>Member Registration Form</h2>
        <p>
          Built a registration form using HTML, CSS, Bootstrap,
          JavaScript and jQuery.
        </p>
        <p><strong>Completion Date:</strong> April 2026</p>
      </div>

      <div className="project-card">
        <img src={project3} alt="Portfolio Website" />
        <h2>Portfolio Website</h2>
        <p>
          Designed and developed a personal portfolio website using
          React and React Router.
        </p>
        <p><strong>Completion Date:</strong> June 2026</p>
      </div>

    </div>
  );
}

export default Projects;