import { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSave, FaSignOutAlt } from 'react-icons/fa';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [editando, setEditando] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    buscarTarefas();
  }, []);

  const buscarTarefas = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      alert('Erro ao carregar tarefas. Redirecionando para login...');
      navigate('/login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    try {
      if (editando) {
        await api.put(`/tasks/${editando}`, {
          title: titulo,
          description: descricao,
        });
      } else {
        await api.post('/tasks', {
          title: titulo,
          description: descricao,
        });
      }
      setTitulo('');
      setDescricao('');
      setEditando(null);
      buscarTarefas();
    } catch (err) {
      console.log('Erro ao salvar tarefa:', err.response?.data);
      alert('Erro ao salvar tarefa: ' + (err.response?.data?.error || 'Erro desconhecido'));
    }
  };

  const handleEditar = (tarefa) => {
    setEditando(tarefa.id);
    setTitulo(tarefa.title);
    setDescricao(tarefa.description);
  };

  const handleExcluir = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      buscarTarefas();
    } catch (err) {
      alert('Erro ao excluir tarefa.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Minhas Tarefas</h2>
        <button style={{ backgroundColor: '#e74c3c' }} onClick={handleLogout}>
          <FaSignOutAlt style={{ marginRight: '5px' }} /> Sair
        </button>

      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button type="submit">
          {editando ? (
            <>
              <FaSave style={{ marginRight: '5px' }} />
              Atualizar
            </>
          ) : (
            <>
              <FaPlus style={{ marginRight: '5px' }} />
              Adicionar
            </>
          )}
        </button>

      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <strong>{t.title}</strong>
            <p>{t.description}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button style={{ backgroundColor: '#f39c12' }} onClick={() => handleEditar(t)}>
              <FaEdit style={{ marginRight: '5px' }} /> Editar
            </button>
            <button style={{ backgroundColor: '#e74c3c' }} onClick={() => handleExcluir(t.id)}>
              <FaTrash style={{ marginRight: '5px' }} /> Excluir
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
