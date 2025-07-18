import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import Application from './pages/Application';

import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

function App() {
  const [isUserSignedIn] = useState(!!localStorage.getItem('token'));
  return (
    <>
      <div className="min-h-screen w-full bg-[linear-gradient(to_bottom_right,_theme(colors.sky.300),_theme(colors.sky.500),_theme(colors.sky.600))] dark:bg-[linear-gradient(to_bottom_right,_theme(colors.sky.800),_theme(colors.sky.900),_theme(colors.sky.950))] text-sky-950 dark:text-sky-200 transition-colors duration-300">
        {!isUserSignedIn && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/application" element={<Application />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </>
  );
}

export default App;
