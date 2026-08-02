import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser(
        formData.email,
        formData.password
      );

      console.log("LOGIN RESULT:", result);

      localStorage.setItem("token", result.token);

      console.log(
        "TOKEN IN LOCAL STORAGE:",
        localStorage.getItem("token")
      );

      navigate("/admin");

      console.log("NAVIGATED TO ADMIN");
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;