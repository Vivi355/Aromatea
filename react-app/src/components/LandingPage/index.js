import React from 'react'

import "./LandingPage.css"

function LandingPage() {
    const bgStyle = {
        backgroundImage: "url('https://cdn.discordapp.com/attachments/1134917911941742615/1149168066207432825/drew-jemmett-qEcWgrTG578-unsplash.jpg')",
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
