import { useEffect, useState, useCallback } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSave, FaSignOutAlt } from 'react-icons/fa';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(null);

  const navigate = useNavigate();

  const searchTask = useCallback (async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      alert('Error loading tasks, redirecting to login');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    searchTask();
  }, [searchTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editing) {
        await api.put(`/tasks/${editing}`, {
          title,
          description,
        });
      } else {
        await api.post('/tasks', {
          title,
          description,
        });
      }
      setTitle('');
      setDescription('');
      setEditing(null);
      searchTask();
    } catch (err) {
      console.log('Error saving task: ', err.response?.data);
      alert('Error saving task: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  const handleEdit = (tarefa) => {
    setEditing(tarefa.id);
    setTitle(tarefa.title);
    setDescription(tarefa.description);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      searchTask();
    } catch (err) {
      alert('Error deleting task: ' + err.response?.data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>My Tasks</h2>
        <button style={{ backgroundColor: '#e74c3c' }} onClick={handleLogout}>
          <FaSignOutAlt style={{ marginRight: '5px' }} /> Log Out
        </button>

      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">
          {editing ? (
            <>
              <FaSave style={{ marginRight: '5px' }} />
              Update
            </>
          ) : (
            <>
              <FaPlus style={{ marginRight: '5px' }} />
              Add
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
            <button style={{ backgroundColor: '#f39c12' }} onClick={() => handleEdit(t)}>
              <FaEdit style={{ marginRight: '5px' }} /> Edit
            </button>
            <button style={{ backgroundColor: '#e74c3c' }} onClick={() => handleDelete(t.id)}>
              <FaTrash style={{ marginRight: '5px' }} /> Delete
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
