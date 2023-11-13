//* LIB
import React from "react";
import Lottie from "lottie-react";

//* IMPORT
import * as computer from "@/assets/jsons/computer.json";
import * as marketing from "@/assets/jsons/marketing.json";
import { createDefaultOptions } from "@/utils/AnimationUtils";
import Button from "./Button/Button";

const Contents = ({ onChangePage }) => {
  return (
    <React.Fragment>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Note New Here?</h3>
            <p>
              Hello everyone,i am tai,you is have account yet ? Can I help you?
              I am ready to help you now !
            </p>
            <Button
              className="btn transparent"
              id="sign-up-btn"
              title="Sign Up"
              onClick={onChangePage}
            />
          </div>
          <div className="image">
            <Lottie {...createDefaultOptions(computer)} />
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Are you ready to go home website?</h3>
            <p>
              Thank you was a visit company TaiHeo Dev Web, I wish you a good
              day,I love you so much
            </p>
            <Button
              className="btn transparent"
              id="sign-in-btn"
              title="Sign in"
              onClick={onChangePage}
            />
          </div>
          <div className="image">
            <Lottie {...createDefaultOptions(marketing)} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contents;
