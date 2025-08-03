import Oauth from './Oauth';
import { login } from '../api/users';

function LoginForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    const response = await login(email, password);

    if (!response.success) {
      alert(response.error);
      return;
    }

    alert('Login successful!');
    event.target.reset();
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
