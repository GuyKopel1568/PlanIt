import React from 'react';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import { app } from '../firebase';

function Oauth() {
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const email = result.user.email;
      const displayName = result.user.displayName || '';
      const firstName = displayName.split(' ')[0] || '';
      const lastName = displayName.split(' ')[1] || '';
      const username = displayName;

      const res = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          username,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Google OAuth failed');
      }

      // success
      console.log('✅ Google login success:', data);
    } catch (err) {
      console.error('Google OAuth error:', err);
    }
  };

  const handleFacebookClick = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const email = result.user.email;
      const displayName = result.user.displayName || '';
      const firstName = displayName.split(' ')[0] || '';
      const lastName = displayName.split(' ')[1] || '';
      const username = displayName;

      const res = await fetch('http://localhost:5000/api/auth/facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          username,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Facebook OAuth failed');
      }

      // success
      console.log('✅ Facebook login success:', data);
    } catch (err) {
      console.error('Facebook OAuth error:', err);
    }
  };

  return (
    <>
      <button
        onClick={handleGoogleClick}
        type="button"
        className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-60 cursor-pointer transition-all duration-300"
      >
        continue with Google
      </button>

      <button
        onClick={handleFacebookClick}
        type="button"
        className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-60 cursor-pointer transition-all duration-300"
      >
        continue with facebook
      </button>
    </>
  );
}

export default Oauth;
