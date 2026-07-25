import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <h2>Administration</h2>

            <div className="admin-links">
                <Link to="/admin/projects">Manage Projects</Link>

                <Link to="/admin/services">Manage Services</Link>

                <Link to="/admin/references">Manage References</Link>

                <Link to="/admin/users">Manage Users</Link>
            </div>
        </div>
    );
}

export default AdminDashboard;