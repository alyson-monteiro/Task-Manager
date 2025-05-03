import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', {
        username,
        email,
        password: senha // ✔️ Enviar com nome esperado pelo backend
      });
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (err) {
      console.log('ERRO COMPLETO', err.response?.data); // 👀 Inspeciona resposta real
      alert('Erro ao cadastrar: ' + (err.response?.data?.error || 'Erro desconhecido'));
    }
  };

  return (
    <div className="container">
      <div>
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
