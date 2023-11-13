//* LIB
import React from "react";

//* IMPORT
import LoginPage from "./login/page";
import RegisterPage from "./register/page";
import Contents from "@/components/ContentsAuth";

const AuthPage = () => {
  const [isChangePage, setIsChangePage] = React.useState(false);
  const handleChangePageAuth = () => {
    setIsChangePage((prev) => !prev);
  };
  return (
    <React.Fragment>
      <div className={`container1 ${isChangePage ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <LoginPage />
            <RegisterPage />
          </div>
          <Contents onChangePage={handleChangePageAuth} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AuthPage;
