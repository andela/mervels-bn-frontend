import React from 'react';
import Navbar from './shared/navbarComponent';

function HomePage() {
    return(
        <>
        <Navbar/>
        <h6>Home Page only when logged in</h6>
        </>
    );
}

export default HomePage;