// resources/js/pages/Index.tsx
import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  titulo: string;
  descricao: string | null;
  status: 'pendente' | 'concluída';
}

export default function Index() {
   const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca as tarefas no backend quando o componente é montado
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');

        if (!response.ok) {
          throw new Error('Erro ao carregar tarefas');
        }

        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError('Não foi possível carregar as tarefas.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Abre o modal de edição
  const handleEditClick = (task: Task) => {
    setCurrentTask(task);
    setShowEditModal(true);
  };

  // Salva alterações no backend
  const handleSaveChanges = async (taskToUpdate = currentTask) => {
  if (!taskToUpdate) return;

  try {
    const response = await fetch(`/api/tasks/${taskToUpdate.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskToUpdate),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar tarefa');
    }

    const updatedTask = await response.json();

    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)
    ));

    setShowEditModal(false);
  } catch (err) {
    console.error('Falha ao salvar:', err);
    alert('Não foi possível salvar as alterações.');
  }
};

  // Cria nova tarefa
  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newTask = {
      titulo: formData.get('titulo'),
      descricao: formData.get('descricao') || null,
      status: formData.get('status') || 'pendente',
    };

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar tarefa');
      }

      const createdTask = await response.json();
      setTasks((prev) => [...prev, createdTask]);
      setShowCreateModal(false);
    } catch (err) {
      console.error('Falha ao criar:', err);
      alert('Erro ao criar tarefa.');
    }
  };

const handleDelete = async (taskId: number) => {
  if (!window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
    return;
  }

  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir tarefa');
    }

    // Atualiza o estado local removendo a tarefa excluída
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    setShowEditModal(false);
  } catch (err) {
    console.error('Falha ao excluir:', err);
    alert('Não foi possível excluir a tarefa.');
  }
};
  // Concluir tarefa
const handleMarkAsCompleted = (id: number) => {
  const taskToComplete = tasks.find(task => task.id === id);

  if (!taskToComplete) return;

  const updatedTask = { ...taskToComplete, status: 'concluída' } satisfies Task;

  setCurrentTask(updatedTask);
  handleSaveChanges(updatedTask);
};

  return (
    <div className='flex-column' id='tarefas'>
      <h1>Minhas Tarefas</h1>

      {/* Botão para abrir o modal de criação */}
      <button
         onClick={() => setShowCreateModal(true)}
        
      >
        Nova Tarefa
      </button>

      {/* Listagem de tarefas */}
      <ul id='lista-tarefas'>
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => handleEditClick(task)}
        className='flex-between'
          ><div>
            {task.titulo} - <span>{task.status}</span>
          </div><div>
            <button className='btn'
            onClick={(e) => {
            e.stopPropagation(); handleDelete(task.id)}}
            ><i className="fa-solid fa-trash"></i></button>
            <button className='btn'
            onClick={(e) => {
            e.stopPropagation();
            handleMarkAsCompleted(task.id);
            }}>
            <i className="fa-solid fa-circle-check"></i></button>
            </div>
          </li>
        ))}
      </ul>


      {/* Modal de Edição */}
      {showCreateModal && (
        <div id='modal-tarefa' className='modal'>
          <div>

            <h2>Nova Tarefa</h2>

            <form onSubmit={handleCreateTask} className='flex-column gap-8'>
              <div className='flex-column'>
                <label>Título</label>
                <input
                  type="text"
                  name='titulo'
                  placeholder="Digite o título"
                />
              </div>

              <div className='flex-column'>
                <label>Descrição</label>
                <textarea
                  placeholder="Descrição da tarefa"
                  name='descricao'
                ></textarea>
              </div>

              <div className='flex-column'>
                <label>Status</label>
                <select name='status'>
                  <option value="pendente">Pendente</option>
                  <option value="concluída">Concluída</option>
                </select>
              </div>

              <div  className='flex-between'>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
)}

      {/* Modal de Edição */}
      {showEditModal && currentTask && (
  <div className='modal'>
    <div>
      <button
        onClick={() => setShowEditModal(false)}
      >
        &times;
      </button>

      <h2>Editar Tarefa</h2>

      <div  className='flex-column gap-8'>
        <div className='flex-column'>
          <label>Título</label>
          <input
            type="text"
            value={currentTask.titulo}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, titulo: e.target.value })
            }
          />
        </div>

        <div className='flex-column'>
          <label>Descrição</label>
          <textarea
            value={currentTask.descricao || ''}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, descricao: e.target.value })
            }
          ></textarea>
        </div>

        <div className='flex-column'>
          <label>Status</label>
          <select
            value={currentTask.status}
            onChange={(e) =>
              setCurrentTask({
                ...currentTask,
                status: e.target.value as 'pendente' | 'concluída',
              })
            }
          >
            <option value="pendente">Pendente</option>
            <option value="concluída">Concluída</option>
          </select>
        </div>

        <div>

          <div className='flex-between'>
            <button onClick={() =>handleDelete(currentTask.id)}>
              Excluir
              </button>
            <button onClick={() => handleSaveChanges()}>
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}