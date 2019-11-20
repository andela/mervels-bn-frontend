/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function SidebarComponent({pageRole}) {
    let links;
    switch (pageRole) {
        case "Manager":
                links = <a className="active" href="/approvals">My Approvals</a>;
            break;

        case "Admin":
                links = <a className="active" href="#">Settings</a>;
            break;
        default:
            break;
    }
    return (
        <div className="sidebar">
            <h1 className="text-center m-top-2 m-bottom-2">{ pageRole }</h1>
            {links}
        </div>
    );
}

export default SidebarComponent;
