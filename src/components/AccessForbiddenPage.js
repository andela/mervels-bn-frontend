
/* eslint-disable no-unused-vars */
import React from 'react';
import "../styles/403.scss";
import "../styles/App.scss";

function AccessForbiddenPage(props) {
    return (
        <>
            <div id="AccessForbidden">
                <div>403</div>
                <div className="txt">
                    Forbidden<span className="blink">_</span>
                </div>
                <div className="txt m-top-2">
                    <a href="/home">Go home</a>
                </div>
            </div>
        </>
    );
}

export default AccessForbiddenPage;

