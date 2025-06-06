import { useEffect, useRef, useState } from 'react';
import FormInput from '../components/FormInput';
import { useDarkMode } from '../context/DarkModeContext';

function Login({ onClose }) {
  const { isDarkMode } = useDarkMode();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({});

  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLoginMode
      ? 'http://localhost:5000/api/login'
      : 'http://localhost:5000/api/createUser';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || (data.errors && data.errors.join(', ')));
      }

      if (isLoginMode) {
        alert('Login successful!');
        localStorage.setItem('token', data.token);
      } else {
        alert('Account created successfully!');
      }

      onClose();
    } catch (err) {
      alert('Error: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div
      ref={modalRef}
      className="w-[500px] h-[600px] rounded-2xl relative overflow-hidden shadow-lg flex items-center justify-center"
    >
      {isDarkMode && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: isLoginMode
              ? "url('/road.jpg')"
              : "url('/road2_dark.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px) brightness(0.9) grayscale(0.7)',
          }}
        ></div>
      )}

      {isDarkMode && <div className="absolute inset-0 bg-black/30 z-10"></div>}

      <div className="relative z-20 w-full h-full px-6 py-2 flex flex-col items-center gap-4 justify-center">
        <div className="flex justify-center m-2">
          <h2 className="text-8xl text-[var(--color-blue-400)] font-semibold text-center">
            {isLoginMode ? 'Login' : 'Sign Up'}
          </h2>
        </div>

        <div className="relative w-2/3 flex h-16 border border-gray-300 rounded-full overflow-hidden mb-2">
          <button
            className={`w-1/2 text-lg font-medium transition-all z-10 ${
              !isLoginMode
                ? 'text-[var(--color-gray-200)]'
                : 'text-[var(--color-blue-400)] hover:text-[var(--color-blue-800)]'
            }`}
            onClick={() => setIsLoginMode(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 text-lg font-medium transition-all z-10 ${
              isLoginMode
                ? 'text-[var(--color-gray-200)]'
                : 'text-[var(--color-blue-400)] hover:text-[var(--color-blue-800)]'
            }`}
            onClick={() => setIsLoginMode(false)}
          >
            Sign Up
          </button>
          <div
            className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-900 to-cyan-600 ${
              isLoginMode ? 'left-0' : 'left-1/2'
            } transition-all duration-500 ease-in-out`}
          ></div>
        </div>

        <form
          className="w-full flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          {isLoginMode ? (
            <div className="animate-fadeLeft ease-in transition duration-300 w-full">
              <FormInput text="Email address" type="email" required={true} />
              <FormInput text="Password" type="password" required={true} />
              <label className="flex items-center gap-2 justify-between">
                <span className="flex items-center gap-2">
                  <input type="checkbox" id="rememberMe" />
                  Remember Me
                </span>
                <a href="#" className="text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </label>
            </div>
          ) : (
            <div className="animate-fadeRight grid grid-cols-3 gap-4 w-full">
              <FormInput
                text="Email address"
                type="email"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <FormInput
                text="Password"
                type="password"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <FormInput
                text="Confirm password"
                type="password"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <FormInput
                text="First name"
                type="text"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <FormInput
                text="Last name"
                type="text"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
              <FormInput
                text="Username"
                type="text"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <FormInput
                text="Date of Birth"
                type="date"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
              />
              <FormInput
                text="Phone number"
                type="tel"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
              <FormInput
                text="Address"
                type="text"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              <FormInput
                text="City"
                type="text"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
              <FormInput
                text="State"
                type="text"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              />
            </div>
          )}

          <p>
            {isLoginMode
              ? "Don't have an account?"
              : 'Already have an account?'}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginMode((mode) => !mode);
              }}
              className="text-blue-500 hover:underline cursor-pointer ml-1"
            >
              {isLoginMode ? 'Sign Up Now' : 'Login'}
            </a>
          </p>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
          >
            {isLoginMode ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
