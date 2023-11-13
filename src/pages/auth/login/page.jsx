//* LIB
import React from "react";
import { useForm } from "react-hook-form";

//* IMPORT
import { createDefaultOptions } from "@/utils/AnimationUtils";
import ButtonSocial from "@/components/Button/ButtonSocial";
import * as google from "@/assets/jsons/google.json";
import * as facebook from "@/assets/jsons/facebook.json";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const passwords = React.useRef({});
  passwords.current = watch("password");

  const handleLogin = (data) => {
    console.log(data);
  };
  return (
    <React.Fragment>
      <form
        className="sign-in-form form-main"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h2 className="title">Sign in</h2>
        <div className="loginGoogleFb">
          {/* Login Google */}
          <div className="login_google">
            <ButtonSocial
              content="Sign in Google +"
              optionAnimation={createDefaultOptions(google)}
            />
          </div>
          {/* Login Facebook */}
          <div className="login_google">
            <ButtonSocial
              content="Sign in Facebook +"
              optionAnimation={createDefaultOptions(facebook)}
            />
          </div>
        </div>

        <div className="input-field">
          <i className="fas fa-user" />
          <input
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
            })}
            id="email"
            type="email"
            placeholder="Email Address"
            name="email"
          />
        </div>
        <span style={{ color: "red" }}>
          {errors.email?.type === "required" && "Mời bạn nhập Email đầy đủ! "}
          {errors?.email?.type === "pattern" && "Email của ban không hợp lệ!"}
        </span>

        <div className="input-field">
          <i className="fas fa-lock" />
          <input
            {...register("password", {
              required: true,
            })}
            id="password"
            type="password"
            placeholder="Password"
            name="password"
          />
        </div>
        <span style={{ color: "red" }}>
          {errors.password?.type === "required" &&
            "Mời bạn nhập đầy đủ mật khẩu."}
          {errors.password?.type && "Mật khẩu bạn nhập không chính xác"}
        </span>
        <input type="submit" name="signin" className="btn solid" />
        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Link to="/forget">
            <a href="" style={{ color: "#4590ef" }}>
              Forgot Password?
            </a>
          </Link>
        </p>
      </form>
    </React.Fragment>
  );
};

export default LoginPage;
