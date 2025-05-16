import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskManager.css';

const API_URL = 'http://127.0.0.1:8000';

const TaskManager = () => {
  const [token, setToken] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await axios.post(`${API_URL}/register`, { username, password });
      alert('Registration successful. Now login.');
    } catch (err) {
      alert('Registration failed');
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, new URLSearchParams({ username, password }));
      setToken(res.data.access_token);
    } catch (err) {
      alert('Login failed');
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks');
    }
  };

  const addTask = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/tasks`,
        { title: taskTitle, description: taskDescription, completed: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, res.data]);
      setTaskTitle('');
      setTaskDescription('');
    } catch (err) {
      console.error('Error adding task');
    }
  };

  const suggestTask = async () => {
    try {
      const res = await axios.post(`${API_URL}/tasks/suggest`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error('Error suggesting task');
    }
  };

  return (
    <div className="container">
      <h2>Task Manager</h2>

      <div className="auth-box">
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
      </div>

      <div className="task-input-box">
        <input placeholder="Title" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} />
        <input placeholder="Description" value={taskDescription} onChange={e => setTaskDescription(e.target.value)} />
        <button onClick={addTask}>Add Task</button>
        <button onClick={suggestTask}>Suggest Task</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}><strong>{task.title}</strong>: {task.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
