import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function SignIn() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  return (
    <div className="pt-24 min-h-screen">
      <button
        className="text-red-400 bg-gray-600 p-2 rounded mb-4"
        onClick={() => setIsLoggingIn(!isLoggingIn)}
      >
        {isLoggingIn ? 'REGISTER' : 'LOG IN'}
      </button>

      {isLoggingIn ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

export default SignIn;
