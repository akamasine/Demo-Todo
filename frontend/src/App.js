import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      console.log('Fetching todos...');
      const response = await axios.get('/api/todos');
      console.log('Todos fetched:', response.data);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to fetch todos');
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      console.log('Adding new todo:', newTodo);
      const response = await axios.post('/api/todos', { text: newTodo });
      console.log('Todo added:', response.data);
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('Failed to add todo');
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      console.log('Toggling todo:', id, completed);
      const response = await axios.put(`/api/todos/${id}`, { completed: !completed });
      console.log('Todo updated:', response.data);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update todo');
    }
  };

  return (
    <div className="App">
      <h1>Todo Application</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => toggleTodo(todo.id, todo.completed)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;