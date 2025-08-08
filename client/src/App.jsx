import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Application from './pages/Application';

import Navbar from './components/Navbar';

import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import SignIn from './pages/SignIn';

function App() {
  const [isUserSignedIn] = useState(!!localStorage.getItem('token'));
  console.log('User signed in:', isUserSignedIn);
  return (
    <>
      <div className="min-h-screen w-full bg-[linear-gradient(to_bottom_right,_theme(colors.sky.300),_theme(colors.sky.500),_theme(colors.sky.600))] dark:bg-[linear-gradient(to_bottom_right,_theme(colors.sky.800),_theme(colors.sky.900),_theme(colors.sky.950))] text-sky-950 dark:text-sky-200 transition-colors duration-300">
        {!isUserSignedIn && <Navbar />}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/application" element={<Application />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </>
  );
}

export default App;
