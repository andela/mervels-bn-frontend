import React from 'react';
import Navbar from './shared/navbarComponent';

const singleRequestPage = (ownProps) =>{
    const { requestId } = ownProps.match.params;
    return(
        <div>
        <Navbar />
        <p>Request with Id {requestId}</p>
    </div>
    );

};

export default singleRequestPage;