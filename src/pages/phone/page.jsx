import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';

import { authPhone } from '@/common/configs/database/firebase';
import {
  RecaptchaVerifier,
  onAuthStateChanged,
  signInWithPhoneNumber,
  signOut,
} from 'firebase/auth';
import OtpInput from 'otp-input-react';
import { useLayoutEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhonePage = () => {
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [result, setResult] = useState('');

  const onCaptchVerify = async (formatPh) => {
    const recaptchaVerifier = new RecaptchaVerifier(authPhone, 'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        if (response) {
          setShowOTP(true);
        }
      },
      'expired-callback': (data) => {
        console.log(data, '----');
        setLoading(false);
      },
    });
    recaptchaVerifier.render();
    return signInWithPhoneNumber(authPhone, formatPh, recaptchaVerifier);
  };

  const onSignup = async () => {
    if (!ph) return toast.error('Please enter phone!');
    setLoading(true);
    const formatPh = '+' + ph;
    try {
      const response = await onCaptchVerify(formatPh);
      console.log(response, 'phone Ok');
      setResult(response);
      setLoading(false);
      toast.success('OTP sended successfully!');
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const onOTPVerify = async () => {
    setLoading(true);
    try {
      const data = await result.confirm(otp);
      setUser(data.user);
      setLoading(false);
      toast.success('Login success!');
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  const logOut = () => {
    toast.success('Logout success!');
    setShowOTP(false);
    setPh('');
    setUser('');
    setOtp('');
    return signOut(authPhone);
  };
  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(authPhone, (currentuser) => {
      console.log('Auth', currentuser);

      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <section className="bg-emerald-500 flex items-center justify-center h-screen">
        <div>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id="recaptcha-container"></div>
          {user ? (
            <>
              <h2 className="text-center text-white font-medium text-2xl">👍Login Success</h2>
              <button
                className="bg-slate-500 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                onClick={logOut}
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
                    onClick={onOTPVerify}
                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                    <span>Verify OTP</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsTelephoneFill size={30} />
                  </div>
                  <label htmlFor="" className="font-bold text-xl text-white text-center">
                    Verify your phone number
                  </label>
                  <PhoneInput country={'vn'} value={ph} onChange={setPh} />
                  <button
                    onClick={onSignup}
                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                    <span>Send code via SMS</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PhonePage;
