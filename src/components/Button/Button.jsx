//* LIB
import React from "react";

const Button = ({ className, id, onClick, title }) => {
  return (
    <React.Fragment>
      <button className={`${className} `} id={`${id}`} onClick={onClick}>
        {title}
      </button>
    </React.Fragment>
  );
};

export default Button;
