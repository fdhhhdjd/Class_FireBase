import React from 'react';
import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';

import { auth } from '@/common/configs/database/firebase';
import useAuth from '@/hooks/useAuth';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import OtpInput from 'otp-input-react';
import { Toaster, toast } from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhonePage = () => {
  const { user, setUser, logOut } = useAuth();

  const [otp, setOtp] = React.useState('');
  const [ph, setPh] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showOTP, setShowOTP] = React.useState(false);
  const [result, setResult] = React.useState('');

  const handleReCapChaVerification = async (formatPh) => {
    try {
      const reCaptChaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          if (response) {
            toast.warning('You is people 😂 ');
          }
        },
        'expired-callback': () => {
          toast.warning('You is robot 🤖 ');
          setLoading(false);
        },
      });
      reCaptChaVerifier.render();
      return signInWithPhoneNumber(auth, formatPh, reCaptChaVerifier);
    } catch (error) {
      return toast.error(error.message);
    }
  };

  const handleSignUp = async () => {
    if (!ph) return toast.error('Please enter phone!');
    setLoading(true);
    const formatPh = '+' + ph;
    try {
      const response = await handleReCapChaVerification(formatPh);
      setShowOTP(true);
      setResult(response);
      setLoading(false);
      toast.success('OTP sended successfully!');
    } catch (error) {
      setLoading(false);
      return toast.error('Phone incorrect');
    }
  };

  const handleOTPVerify = async () => {
    setLoading(true);
    try {
      const data = await result.confirm(otp);
      setUser(data.user);
      setLoading(false);
      toast.success('Login success!');
    } catch (error) {
      setLoading(false);
      return toast.error('Otp incorrect!');
    }
  };
  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logout success!');
      setShowOTP(false);
      setPh('');
      setUser('');
      setOtp('');
    } catch (error) {
      return toast.error(error.message);
    }
  };
  return (
    <React.Fragment>
      <section className="bg-emerald-500 flex items-center justify-center h-screen">
        <div>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id="recaptcha-container"></div>
          {user ? (
            <>
              <h2 className="text-center text-white font-medium text-2xl">Login Success 😛</h2>
              <button
                className="bg-slate-500 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
              <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
                Welcome to <br /> CODE TEACHER
              </h1>
              {showOTP ? (
                <>
                  <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsFillShieldLockFill size={30} />
                  </div>
                  <label htmlFor="otp" className="font-bold text-xl text-white text-center">
                    Enter your OTP
                  </label>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    className="opt-container "
                  ></OtpInput>
                  <button
                    onClick={handleOTPVerify}
                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                    <span>Verify OTP</span>
                  </button>
                </>
              ) : (
                <React.Fragment>
                  <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsTelephoneFill size={30} />
                  </div>
                  <label htmlFor="" className="font-bold text-xl text-white text-center">
                    Verify your phone number
                  </label>
                  <PhoneInput country={'vn'} value={ph} onChange={setPh} />
                  <button
                    onClick={handleSignUp}
                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                    <span>Send code via SMS</span>
                  </button>
                </React.Fragment>
              )}
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default PhonePage;
