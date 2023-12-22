//* IMPORT
import AboutPage from '@/pages/about/page';
import AuthPage from '@/pages/auth';
import HomePage from '@/pages/home/page';
import NotificationPage from '@/pages/notification/page';

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
];
