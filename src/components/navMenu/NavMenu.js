import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Home } from "../../assets/images/home_FILL0_wght300_GRAD0_opsz24.svg";
import './NavMenu.css';

const NavMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="nav-bar-container">
            <div className="nav-content"> {/* Added container for better alignment */}
                <NavLink to="/" className="nav-home-link" activeClassName="active">
                    {/* <Home className="home-icon" />  */}Home
                </NavLink>

                <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                    <NavLink to="/newsapi" className="nav-item" activeClassName="active">
                        News API
                    </NavLink>
                    <NavLink to="/nyt" className="nav-item" activeClassName="active">
                        New York Times
                    </NavLink>
                    <NavLink
                        to="/the-guardian"
                        className="nav-item"
                        activeClassName="active"
                    >
                        The Guardian
                    </NavLink>
                </div>

                {/* Moved toggle button to the right */}
                <button className="menu-toggle" onClick={toggleMenu}>
                    ☰
                </button>
            </div>
        </nav>
    );
};

export default NavMenu;