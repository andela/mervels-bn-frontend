/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

export default  (location, Link, role) => {
    const links = {
        dashboard: <Link to='/dashboard'>DASHBOARD</Link>,
        requests: <Link to='/requests'>REQUESTS</Link>,
        accommodations: <Link to='/accommodations'>ACCOMMODATIONS</Link>,
        approvals: <Link to='/approvals'>PENDING REQUESTS</Link>,
        settings: <Link to='/settings'>SETTINGS</Link>
    };

    const LinkMaker = ({ check, link }) => (<li
        className={`root menu-item ${ location.pathname.includes(check) ?
            'menu-item-active' : ''
        }`}>
            {link}
        </li>
    );

    const LinkMakerMobile = ({ link }) => (
        <div id='dashboard' className='menu-item-sm'>
            {link}
        </div>
    );

    const template = {
        dashboard: <LinkMaker link={links.dashboard} check='dashboard' />,
        requests:  <LinkMaker link={links.requests} check='request' />,
        accommodations: <LinkMaker link={links.accommodations} check='accommodation' />,
        approvals: <LinkMaker link={links.approvals} check='approvals' />,
        settings: <LinkMaker link={links.settings} check='settings' />
    };
    const templateMobile = {
        dashboard: <LinkMakerMobile link={links.dashboard} />,
        requests: <LinkMakerMobile link={links.requests} />,
        accommodations: <LinkMakerMobile link={links.accommodations} />,
        approvals: <LinkMakerMobile link={links.approvals} />,
        settings: <LinkMakerMobile link={links.settings} />
    };

    let menu;
    let menuMobile;

    const defaultTemp = {
        desktop: [ template.dashboard, template.requests, template.accommodations ],
        mobile: [ templateMobile.dashboard, templateMobile.requests, templateMobile.accommodations ]
    };

    switch (role) {
        case 'Requester':
            menu = defaultTemp.desktop;
            menuMobile = defaultTemp.mobile;
            break;
        case 'Manager':
            menu = [ ...defaultTemp.desktop, template.approvals ];
            menuMobile = [ ...defaultTemp.mobile, templateMobile.approvals ];
            break;
        case 'Travel Admin':
            menu = [ ...defaultTemp.desktop ];
            menuMobile = [ ...defaultTemp.mobile ];
            break;
        case 'Super Administrator':
            menu = [ ...defaultTemp.desktop, template.settings ];
            menuMobile = [ ...defaultTemp.mobile, templateMobile.settings ];
            break;
        case 'Accommodation Supplier':
            menu = [ template.accommodations ];
            menuMobile = [ templateMobile.accommodations ];
            break;
        default:
            break;
    }

    return { menu, menuMobile };
};