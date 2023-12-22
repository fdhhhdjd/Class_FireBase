//* LIB
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

//* IMPORT
import App from './App.jsx';
import './styles/index.jsx';
import store from './redux/store.jsx';
import { UserAuthContextProvider } from './contexts/UserAuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <UserAuthContextProvider>
      <Router>
        <ToastContainer />
        <App />
      </Router>
    </UserAuthContextProvider>
  </Provider>,
);
