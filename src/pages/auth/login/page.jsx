//* LIB
import React from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';

//* IMPORT
import { createDefaultOptions } from '@/common/utils/AnimationUtils';
import ButtonSocial from '@/components/Button/ButtonSocial';
import { Link } from 'react-router-dom';
import { JSON } from '@/assets';
import { useDispatch } from 'react-redux';
import {
  loginFacebookInitial,
  loginGithubInitial,
  loginGoogleInitial,
  loginInitial,
  logoutInitial,
  sendPasswordResetEmailInitial,
} from '@/redux/auth/authThunk';

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const passwords = React.useRef({});
  passwords.current = watch('password');

  const reCaptcha = React.useRef();

  const dispatch = useDispatch();

  const handleLogin = async (data) => {
    dispatch(loginInitial(data));

    // 1. check box
    // console.log(reCaptcha.current.getValue());

    // 2. invisible
    const token = await reCaptcha.current.executeAsync();
    console.log(token);
  };

  return (
    <React.Fragment>
      <form className="sign-in-form form-main" onSubmit={handleSubmit(handleLogin)}>
        <h2 className="title">Sign in</h2>
        <div className="loginGoogleFb">
          {/* Login Google */}
          <div className="login_google">
            <ButtonSocial
              content="Sign in Google +"
              optionAnimation={createDefaultOptions(JSON.googleJson)}
              onHandleClick={() => dispatch(loginGoogleInitial())}
            />
          </div>
          {/* Login Facebook */}
          <div className="login_google">
            <ButtonSocial
              content="Sign in Facebook +"
              optionAnimation={createDefaultOptions(JSON.facebookJson)}
              onHandleClick={() => dispatch(loginFacebookInitial())}
            />
          </div>

          <div className="login_google">
            <ButtonSocial
              content="Sign in Github +"
              optionAnimation={createDefaultOptions(JSON.githubJson)}
              onHandleClick={() => dispatch(loginGithubInitial())}
            />
          </div>
        </div>

        <div className="input-field">
          <i className="fas fa-user" />
          <input
            {...register('email', {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
            })}
            id="email"
            type="email"
            placeholder="Email Address"
            name="email"
          />
        </div>
        <span style={{ color: 'red' }}>
          {errors.email?.type === 'required' && 'Mời bạn nhập Email đầy đủ! '}
          {errors?.email?.type === 'pattern' && 'Email của ban không hợp lệ!'}
        </span>

        <div className="input-field">
          <i className="fas fa-lock" />
          <input
            {...register('password', {
              required: true,
            })}
            id="password"
            type="password"
            placeholder="Password"
            name="password"
          />
        </div>
        <span style={{ color: 'red' }}>
          {errors.password?.type === 'required' && 'Mời bạn nhập đầy đủ mật khẩu.'}
          {errors.password?.type && 'Mật khẩu bạn nhập không chính xác'}
        </span>
        <input type="submit" name="signin" className="btn solid" />
        <ReCAPTCHA
          ref={reCaptcha}
          sitekey={process.env.RE_CAPTCHA_KEY}
          size="invisible"
          theme="light"
          badge="bottomleft"
        />
        <p
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <Link to="/forget">
            <a href="" style={{ color: '#4590ef' }}>
              Forgot Password?
            </a>
          </Link>
        </p>
      </form>
      <button onClick={() => dispatch(sendPasswordResetEmailInitial())}>Reset Password</button>
      <button onClick={() => dispatch(logoutInitial())}>logout</button>
    </React.Fragment>
  );
};

export default LoginPage;
