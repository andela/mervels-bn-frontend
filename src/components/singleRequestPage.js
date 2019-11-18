import React from 'react';

const singleRequestPage = (ownProps) =>{
    const { requestId } = ownProps.match.params;
    return(
        <div>
        <p>Request with Id {requestId}</p>
    </div>
    );

};

export default singleRequestPage;