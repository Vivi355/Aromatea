import React from 'react'
import { NavLink } from 'react-router-dom';

import "./LandingPage.css"

function LandingPage() {
    const bgStyle = {
        backgroundImage: "url('https://capstone-aromatea.s3.us-west-1.amazonaws.com/landingPage.jpg')",
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    };

    return (
        <div id='landing-page-div' style={bgStyle}>
            <div id='home-content'>
                <NavLink to="/products/all">
                    SHOP NOW
                </NavLink>
            </div>
        </div>
    );
}


export default LandingPage
