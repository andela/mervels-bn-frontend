/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from "react";

class MenuPane extends React.Component {
  render() {
    const { classes, menu } = this.props;
    return (
      <div className={classes}>
        <div id="myModal" className="modal-menu">
          <div className="modal-content effect1">
            <div className="modal-body">
              {menu}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuPane;
