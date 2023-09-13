import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory  } from "react-router-dom";
import { logout } from "../../store/session";
import './Navigation.css'

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
        dispatch(logout());
        history.push('/')
    };

    return (
        <div ref={dropdownRef} id="profile-container">
            <button onClick={() => setShowMenu(!showMenu)}>
                MY ACCOUNT
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <div className="greeting">
                        <i class="far fa-user"></i>
                        {user?.firstName}
                    </div>
                    <div className="my-products">
                        <i class="fas fa-leaf"></i>
                        <NavLink to="/products/current" onClick={() => setShowMenu(false)}>My Products</NavLink>
                    </div>
                    <div className="new-product-link">
                        <i class="fas fa-plus-square"></i>
                        <NavLink to="/products/new">New Product</NavLink>
                    </div>
                    <div className="logout-btn">
                        <i class="fas fa-sign-out-alt"></i>
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
