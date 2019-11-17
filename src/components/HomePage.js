import React from 'react';
import { connect } from "react-redux";
import Navbar from './shared/navbarComponent';


class HomePage extends React.Component {

    render(){
        return(
            <div>
                <Navbar />
            </div>
        );
    }

}

export default connect() (HomePage);