import { toast } from 'react-toastify';

export const login = async (email, password) => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.error || 'Invalid email or password',
      };
    }

    localStorage.setItem('token', data.token);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: 'Login request failed' };
  }
};

export const registerUser = async (formData) => {
  const { firstName, lastName, username, email, password, confirmPassword } =
    formData;

  const newErrors = {};
  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    newErrors.general = 'All fields are required';
  }
  if (password !== confirmPassword) {
    newErrors.password = 'Passwords do not match';
  }
  if (password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters long';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    newErrors.username =
      'Username can only contain letters, numbers, and underscores';
  }
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    newErrors.email = 'Invalid email format';
  }
  if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
    newErrors.name = 'First name and last name can only contain letters';
  }

  // If there are validation errors, return them
  if (Object.keys(newErrors).length > 0) {
    return { success: false, error: Object.values(newErrors).join(', ') };
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error || 'Registration failed' };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message || 'User registration failed' };
  }
};
