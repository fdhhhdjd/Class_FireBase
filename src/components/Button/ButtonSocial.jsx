//* LIB
import Lottie from 'lottie-react';
import React from 'react';

const ButtonSocial = ({ content, optionAnimation, onHandleClick }) => {
  return (
    <React.Fragment>
      <div className="login" onClick={onHandleClick}>
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <Lottie
              {...optionAnimation}
              style={{
                width: '3rem',
                height: '3rem',
              }}
            />
          </div>
          <p className="btn-text">
            <b>{content}</b>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ButtonSocial;
