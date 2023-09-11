import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory  } from "react-router-dom";
import { logout } from "../../store/session";

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
        <div ref={dropdownRef}>
            <button onClick={() => setShowMenu(!showMenu)}>
                MY ACCOUNT
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <div>
                        Hi! {user?.firstName}
                    </div>
                    <div>
                        <NavLink to="/products/current" onClick={() => setShowMenu(false)}>My Products</NavLink>
                    </div>
                    <div className="new-product-link">
                        <NavLink to="/products/new">Create new product</NavLink>
                    </div>
                    <div>
                        <button
                        onClick={handleLogout}
                        >Log Out</button>
                    </div>
                </ul>
            )}
        </div>
    );
}

export default UserProfileDropdown;