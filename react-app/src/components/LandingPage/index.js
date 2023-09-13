import React from 'react'

import "./LandingPage.css"

function LandingPage() {
    const bgStyle = {
        backgroundImage: "url('https://capstone-aromatea.s3.us-west-1.amazonaws.com/landingPage.jpg')",
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div id='landing-page-div' style={bgStyle}>
            {/* <h1>Discover more</h1> */}
        </div>
    );
}


export default LandingPage
