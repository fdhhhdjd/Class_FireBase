import ToastDisplay from '@/components/Toast/ToastDisplay';
import useAuth from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Notification = () => {
  const { requestForToken, onMessageListener } = useAuth();

  const [notification, setNotification] = useState({ title: '', body: '' });
  const notify = () => toast(<ToastDisplay notification={notification} />);

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  useEffect(() => {
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
  });

  return (
    <>
      <h1>Notification</h1>
      <Toaster />
    </>
  );
};

export default Notification;
