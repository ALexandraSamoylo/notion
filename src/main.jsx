import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import './global.module.scss';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import NoteEditor from './components/Notes/NoteEditor';
import NotFound from './components/NotFound';
import ViewNote from './components/Notes/ViewNote';
import HomePage from './components/HomePage';
import Header from './components/Header';
import { Provider } from 'react-redux';
import store from './components/redux/store'; 

const App = () => {
  const isLoggedIn = !!localStorage.getItem('userId');

  const location = useLocation();
  const hideHeaderRoutes = ['/', '/register', '/login'];

  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <div className="appContainer">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/home" /> : <Home />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notes/create" element={<NoteEditor />} />
          <Route path="/notes/edit/:id" element={<NoteEditor />} />
          <Route path="/notes/view/:id" element={<ViewNote />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {' '}
      {}
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
