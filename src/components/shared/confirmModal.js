/* eslint-disable react/prop-types */
import React from 'react';
import Button from './Button';

const Modal = ({ closeModal, confirm, children }) => {
    return (
        <div className='modal-container'>
            <section className="main-modal">
                {children}
                <br />
                <Button
                    buttonType='button'
                    classes='btn btn-secondary'
                    text='Close'
                    onClick={closeModal}
                />
                <Button
                    buttonType='button'
                    classes='btn btn-danger'
                    text='Confirm'
                    onClick={confirm}
                />
            </section>
      </div>
    );
  };

  export default Modal;