/* eslint-disable react/prop-types */
import React from 'react';
import Button from './shared/Button';

const Modal = ({ amenities, services, closeModal }) => {
    return (
        <div className='modal-container'>
            <section className="main-modal services-modal">
                <Button
                    buttonType='button'
                    classes='btn btn-secondary'
                    text='Close'
                    onClick={closeModal}
                />
                <br />
                <h3>Amenities:</h3>
                {amenities.map((amen) => <p>{amen}</p>)}
                <h3>Services:</h3>
                {services.map((service) => <p>{service}</p>)}
            </section>
      </div>
    );
  };

  export default Modal;