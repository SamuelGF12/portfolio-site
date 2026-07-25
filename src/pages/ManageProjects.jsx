import { useEffect, useState } from "react";
import "./ManageProjects.css";

function ManageProjects() {
  const [projects, setProjects] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [currentProjectId, setCurrentProjectId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completion: "",
    image: "",
  });

  const fetchProjects = () => {
    fetch("https://portfolio-backend-176m.onrender.com/api/projects")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (project) => {
    setIsEditing(true);

    setCurrentProjectId(project.id);

    setFormData({
      title: project.title,
      description: project.description,
      completion: project.completion ? project.completion.substring(0, 10) : "",
      image: project.image,
    });

    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      completion: "",
      image: "",
    });

    setIsEditing(false);

    setCurrentProjectId(null);

    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (isEditing) {
        response = await fetch(
          `https://portfolio-backend-176m.onrender.com/api/projects/${currentProjectId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );
      } else {
        response = await fetch("https://portfolio-backend-176m.onrender.com/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      const result = await response.json();

      if (result.success) {
        alert(
          isEditing
            ? "Project updated successfully!"
            : "Project added successfully!",
        );

        resetForm();

        fetchProjects();
      } else {
        alert(
          isEditing ? "Unable to update project." : "Unable to add project.",
        );
      }
    } catch (error) {
      console.error(error);

      alert("Server error.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://portfolio-backend-176m.onrender.com/api/projects/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        alert("Project deleted successfully!");

        fetchProjects();
      } else {
        alert("Unable to delete project.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="manage-projects">
      <h1>Manage Projects</h1>

      <button
        className="add-button"
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}
      >
        Add New Project
      </button>

      {showForm && (
        <div className="form-container">
          <h2>{isEditing ? "Edit Project" : "Add Project"}</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="completion"
              value={formData.completion}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
            />

            <div className="button-group">
              <button type="submit" className="save-button">
                {isEditing ? "Update Project" : "Save Project"}
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <p className="project-count">Total Projects: {projects.length}</p>

      <table className="projects-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Completion</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <tr key={project.id}>
                <td>{project.title}</td>

                <td>{project.description}</td>

                <td>{new Date(project.completion).toLocaleDateString()}</td>

                <td>{project.image}</td>

                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(project)}
                  >
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No projects found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageProjects;
