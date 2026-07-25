import { useEffect, useState } from "react";
import "./ManageReferences.css";

function ManageReferences() {

    const [references, setReferences] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [currentReferenceId, setCurrentReferenceId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        testimonial: "",
        position: "",
        company: ""
    });

    const fetchReferences = () => {

        fetch("http://localhost:3000/api/references")
            .then((response) => response.json())
            .then((data) => {
                setReferences(data.data);
            })
            .catch((error) => {
                console.error("Error fetching references:", error);
            });

    };

    useEffect(() => {

        fetchReferences();

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleEdit = (reference) => {

        setIsEditing(true);

        setCurrentReferenceId(reference.id);

        setFormData({
            name: reference.name,
            testimonial: reference.testimonial,
            position: reference.position,
            company: reference.company
        });

        setShowForm(true);

    };

    const resetForm = () => {

        setFormData({
            name: "",
            testimonial: "",
            position: "",
            company: ""
        });

        setCurrentReferenceId(null);

        setIsEditing(false);

        setShowForm(false);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            let response;

            if (isEditing) {

                response = await fetch(
                    `http://localhost:3000/api/references/${currentReferenceId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    }
                );

            } else {

                response = await fetch(
                    "http://localhost:3000/api/references",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    }
                );

            }

            const result = await response.json();

            if (result.success) {

                alert(
                    isEditing
                        ? "Reference updated successfully!"
                        : "Reference added successfully!"
                );

                resetForm();

                fetchReferences();

            } else {

                alert(
                    isEditing
                        ? "Unable to update reference."
                        : "Unable to add reference."
                );

            }

        } catch (error) {

            console.error(error);

            alert("Server error.");

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this reference?"
        );

        if (!confirmDelete) return;

        try {

            const response = await fetch(
                `http://localhost:3000/api/references/${id}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (result.success) {

                alert("Reference deleted successfully!");

                fetchReferences();

            } else {

                alert("Unable to delete reference.");

            }

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="manage-references">

            <h1>Manage References</h1>

            <button
                className="add-button"
                onClick={() => {
                    resetForm();
                    setShowForm(true);
                }}
            >
                Add New Reference
            </button>

            {showForm && (

                <div className="form-container">

                    <h2>
                        {isEditing ? "Edit Reference" : "Add Reference"}
                    </h2>

                    <form onSubmit={handleSubmit}>
			
			                        <input
                            type="text"
                            name="name"
                            placeholder="Reference Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="testimonial"
                            placeholder="Testimonial"
                            value={formData.testimonial}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="position"
                            placeholder="Position"
                            value={formData.position}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="company"
                            placeholder="Company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                        />

                        <div className="button-group">

                            <button
                                type="submit"
                                className="save-button"
                            >
                                {isEditing ? "Update Reference" : "Save Reference"}
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

            <p className="reference-count">
                Total References: {references.length}
            </p>

            <table className="projects-table">

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Testimonial</th>
                        <th>Position</th>
                        <th>Company</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>

                </thead>

                <tbody>

                    {references.length > 0 ? (

                        references.map((reference) => (

                            <tr key={reference.id}>

                                <td>{reference.name}</td>

                                <td>{reference.testimonial}</td>

                                <td>{reference.position}</td>

                                <td>{reference.company}</td>

                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEdit(reference)}
                                    >
                                        Edit
                                    </button>
                                </td>

                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(reference.id)}
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="6">
                                No references found.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default ManageReferences;