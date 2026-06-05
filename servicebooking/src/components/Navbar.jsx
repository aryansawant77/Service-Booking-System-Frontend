import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                Service Booking System
            </div>

            <div className="navbar-links">
                <Link to="/">Booking List</Link>
                <Link to="/create">Create Booking</Link>
            </div>
        </nav>
    );
}

export default Navbar;