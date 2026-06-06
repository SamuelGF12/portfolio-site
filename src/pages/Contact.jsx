// Import React hooks and navigation tools
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

function Contact() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: ""
    });

    // Handles updates to form fields
    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }
    // Handles form submission and redirects user to Home page
    function handleSubmit(event) {
        event.preventDefault();

        try {

            console.log(formData);

            alert("Message submitted successfully!");

            navigate("/");

        } catch (error) {

            console.error(error);

            alert("Something went wrong.");

        }
    }

    return (
        <div className="contact">

            <h1>Contact Me</h1>

            <div className="contact-info">
                <h2>Contact Information</h2>
                <p>Email: samuel120996@gmail.com</p>
                <p>Phone: (647) 803-9505</p>
                <p>Location: Kitchener, Ontario</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Contact Number"
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="message"
                    placeholder="Message"
                    rows="5"
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Send Message
                </button>

            </form>

        </div>
    );
}

export default Contact;