import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory  } from "react-router-dom";
import { logout } from "../../store/session";
import './Navigation.css'
import { clearCart } from "../../store/carts";

function UserProfileDropdown({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef();
    const history = useHistory()

    useEffect(() => {
        const closeMenu = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);
        return () => {
            document.removeEventListener("click", closeMenu);
        };
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(clearCart())
        dispatch(logout());
        history.push('/')
    };

    return (
        <div ref={dropdownRef} id="profile-container">
            <button onClick={() => setShowMenu(!showMenu)}>
                MY ACCOUNT <i className="fas fa-caret-down fa-xs"></i>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <div className="greeting">
                        <i className="far fa-user"></i>
                        {user?.firstName}
                    </div>
                    <div className="my-products">
                        <i className="fas fa-leaf"></i>
                        <NavLink to="/products/current" onClick={() => setShowMenu(false)}>My Tea</NavLink>
                    </div>
                    <div className="new-product-link">
                        <i className="fas fa-plus-square"></i>
                        <NavLink to="/products/new">New Tea</NavLink>
                    </div>
                    <div className="logout-btn">
                        <i className="fas fa-sign-out-alt"></i>
                        <button
                        onClick={handleLogout} className="btn"
                        >SIGN OUT</button>
                    </div>
                </ul>
            )}
        </div>
    );
}

export default UserProfileDropdown;
