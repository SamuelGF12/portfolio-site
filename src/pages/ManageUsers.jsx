import { useEffect, useState } from "react";
import "./ManageUsers.css";

function ManageUsers() {

    const [users, setUsers] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [currentUserId, setCurrentUserId] = useState(null);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    const fetchUsers = () => {

        fetch("http://localhost:3000/api/users")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });

    };

    useEffect(() => {

        fetchUsers();

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleEdit = (user) => {

        setIsEditing(true);

        setCurrentUserId(user.id);

        setFormData({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        });

        setShowForm(true);

    };

    const resetForm = () => {

        setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        });

        setCurrentUserId(null);

        setIsEditing(false);

        setShowForm(false);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            let response;

            if (isEditing) {

                response = await fetch(
                    `http://localhost:3000/api/users/${currentUserId}`,
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
                    "http://localhost:3000/api/users",
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
                        ? "User updated successfully!"
                        : "User added successfully!"
                );

                resetForm();

                fetchUsers();

            } else {

                alert(
                    isEditing
                        ? "Unable to update user."
                        : "Unable to add user."
                );

            }

        } catch (error) {

            console.error(error);

            alert("Server error.");

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            const response = await fetch(
                `http://localhost:3000/api/users/${id}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (result.success) {

                alert("User deleted successfully!");

                fetchUsers();

            } else {

                alert("Unable to delete user.");

            }

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="manage-users">

            <h1>Manage Users</h1>

            <button
                className="add-button"
                onClick={() => {
                    resetForm();
                    setShowForm(true);
                }}
            >
                Add New User
            </button>

            {showForm && (

                <div className="form-container">

                    <h2>
                        {isEditing ? "Edit User" : "Add User"}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">
                            {isEditing ? "Update User" : "Save User"}
                        </button>

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            )}

            <table>

                <thead>

                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (

                        <tr key={user.id}>

                            <td>{user.firstname}</td>

                            <td>{user.lastname}</td>

                            <td>{user.email}</td>

                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => handleEdit(user)}
                                >
                                    Edit
                                </button>
                            </td>

                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default ManageUsers;
