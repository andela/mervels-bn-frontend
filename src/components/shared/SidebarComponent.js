import React from 'react';

function SidebarComponent() {
    return (
        <div className="sidebar">
            <h1 className="text-center m-top-2 m-bottom-2">manager</h1>
            <a className="active" href="/approvals">My Approvals</a>
        </div>
    );
}

export default SidebarComponent;
