import { toast } from 'react-toastify';
import Oauth from './Oauth';

function LoginForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log('data => ', data);

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      toast.success('User Logged in!', { autoClose: 3000 });
    } catch (err) {
      toast.error('User Loggin in failed', { autoClose: 3000 });
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <Oauth />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default LoginForm;
