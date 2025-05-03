import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', {
        email,
        password: senha
      });
      localStorage.setItem('token', res.data.token); // 🗝️ Guarda o token
      navigate('/'); // Redireciona para tarefas
    } catch (err) {
      console.log('ERRO LOGIN', err.response?.data);
      alert('Login falhou: ' + (err.response?.data?.error || 'Erro desconhecido'));
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
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
        <p style={{ marginTop: '10px' }}>
          Ainda não tem conta?{' '}
          <button
            style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer' }}
            onClick={() => navigate('/register')}
          >
            Cadastrar-se
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
