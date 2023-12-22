//* IMPORT
import AboutPage from '@/pages/about/page';
import AuthPage from '@/pages/auth';
import HomePage from '@/pages/home/page';
import NotificationPage from '@/pages/notification/page';
import PhonePage from '@/pages/phone/page';

export default [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/notification',
    element: <NotificationPage />,
  },
  {
    path: '/phone',
    element: <PhonePage />,
  },
];
