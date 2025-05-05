import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', res.data.token);
      navigate('/tasks');
    } catch (err) {
      console.log('LOGIN ERROR', err.response?.data);
      alert('Login failed: ' + (err.response?.data?.error || 'Unknown Error'));
    }
  };

  return (
    <div className="container">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign in</button>
        </form>
        <p style={{ marginTop: '10px' }}>
          Does not have an account?{' '}
          <button
            style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer' }}
            onClick={() => navigate('/register')}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
