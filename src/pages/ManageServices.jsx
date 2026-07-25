
import { useEffect, useState } from "react";
import "./ManageServices.css";

function ManageServices() {

    const [services, setServices] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [currentServiceId, setCurrentServiceId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const fetchServices = () => {

        fetch("https://portfolio-backend-176m.onrender.com/api/services")
            .then((response) => response.json())
            .then((data) => {
                setServices(data.data);
            })
            .catch((error) => {
                console.error("Error fetching services:", error);
            });

    };

    useEffect(() => {

        fetchServices();

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleEdit = (service) => {

        setIsEditing(true);

        setCurrentServiceId(service.id);

        setFormData({
            title: service.title,
            description: service.description
        });

        setShowForm(true);

    };

    const resetForm = () => {

        setFormData({
            title: "",
            description: ""
        });

        setCurrentServiceId(null);

        setIsEditing(false);

        setShowForm(false);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            let response;

            if (isEditing) {

                response = await fetch(
                    `https://portfolio-backend-176m.onrender.com/api/services/${currentServiceId}`,
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
                    "https://portfolio-backend-176m.onrender.com/api/services",
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
                        ? "Service updated successfully!"
                        : "Service added successfully!"
                );

                resetForm();

                fetchServices();

            } else {

                alert(
                    isEditing
                        ? "Unable to update service."
                        : "Unable to add service."
                );

            }

        } catch (error) {

            console.error(error);

            alert("Server error.");

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this service?"
        );

        if (!confirmDelete) return;

        try {

            const response = await fetch(
                `https://portfolio-backend-176m.onrender.com/api/services/${id}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (result.success) {

                alert("Service deleted successfully!");

                fetchServices();

            } else {

                alert("Unable to delete service.");

            }

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="manage-services">

            <h1>Manage Services</h1>

            <button
                className="add-button"
                onClick={() => {
                    resetForm();
                    setShowForm(true);
                }}
            >
                Add New Service
            </button>

            {showForm && (

                <div className="form-container">

                    <h2>
                        {isEditing ? "Edit Service" : "Add Service"}
                    </h2>

                    <form onSubmit={handleSubmit}>

		                        <input
                            type="text"
                            name="title"
                            placeholder="Service Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Service Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                        <div className="button-group">

                            <button
                                type="submit"
                                className="save-button"
                            >
                                {isEditing ? "Update Service" : "Save Service"}
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

            <p className="service-count">
                Total Services: {services.length}
            </p>

            <table className="projects-table">

                <thead>

                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>

                </thead>

                <tbody>

                    {services.length > 0 ? (

                        services.map((service) => (

                            <tr key={service.id}>

                                <td>{service.title}</td>

                                <td>{service.description}</td>

                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEdit(service)}
                                    >
                                        Edit
                                    </button>
                                </td>

                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(service.id)}
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="4">
                                No services found.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default ManageServices;