/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import onClickOutside from "react-onclickoutside";

class DropdownComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            listOpen: false,
            headerTitle: this.props.title
        };
    }

    handleClickOutside(){
        this.setState({
          listOpen: false
        });
      }

      toggleList(){
        this.setState(prevState => ({
          listOpen: !prevState.listOpen
        }));
      }

    render() {
        const{ list } = this.props;
        const{ listOpen, headerTitle } = this.state;
        return (
            <div className="dropdown">
                <div className="dropdown-header" onClick={() => this.toggleList()}>
                    <div className="dropdown-header-title">{headerTitle}</div>
                        {listOpen
                        ? <FontAwesomeIcon icon={faAngleUp} />
                        : <FontAwesomeIcon icon={faAngleDown} />
                        }
                </div>
                    {listOpen && <ul className="dd-list">
                        {list.map((item) => (
                            <li className="dd-list-item" key={item.id} >{item.title}</li>
                            ))}
                        </ul>}
            </div>
        );
    }
}

export default  onClickOutside(DropdownComponent);