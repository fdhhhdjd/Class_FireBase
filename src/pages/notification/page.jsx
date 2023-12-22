import { requestForToken, onMessageListener } from '@/common/configs/database/firebase';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Notification = () => {
  const [notification, setNotification] = useState({ title: '', body: '' });
  const notify = () => toast(<ToastDisplay />);
  function ToastDisplay() {
    return (
      <div>
        <h1>
          <b>{notification?.title}</b>
        </h1>
        <p
          style={{
            fontSize: '1rem',
          }}
        >
          {notification?.body}
        </p>
        <img
          src={notification?.image}
          style={{
            width: 'auto',
            height: '50px',
            textAlign: 'center',
            marginLeft: '4.2rem',
          }}
        />
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  requestForToken();

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
        image: payload?.notification?.image,
      });
    })
    .catch((err) => console.log('failed: ', err));

  return <Toaster />;
};

export default Notification;
