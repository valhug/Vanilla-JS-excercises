import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './App.css';
import logo from './logo.svg';
import { db } from './firebase';


function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);


  // Load todos from local storage on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      const snapshot = await db.collection('todos').get();
      const todosArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(todosArray);
    };

    fetchTodos();
  }, []); // Empty array means this effect runs once, similar to componentDidMount

  // Save todos to local storage whenever the todos state changes
  useEffect(() => {
    const unsubscribe = db.collection('todos').onSnapshot((snapshot) => {
      const todosArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(todosArray);
    });

    return () => unsubscribe();
  }, []);

  const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(search.toLowerCase()))

  const addTodo = async (todo) => {
    const docRef = await db.collection('todos').add(todo);
    setTodos([...todos, { ...todo, id: docRef.id }]);
  };

  const toggleComplete = async (id) => {
    const todo = todos.find(todo => todo.id === id);
    await db.collection('todos').doc(id).update({
      completed: !todo.completed
    });
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };



  const removeTodo = async (id) => {
    await db.collection('todos').doc(id).delete();
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = async (id, newText) => {
    await db.collection('todos').doc(id).update({
      text: newText
    });
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const reorderTodos = (startIndex, endIndex) => {
    const result = Array.from(todos);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTodos(result);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Todo List</h1>
        <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search todos"
      />
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </button>
      </header>
      <TodoForm addTodo={addTodo} />
      <h2>Active Todos</h2>
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        removeTodo={removeTodo}
        editTodo={editTodo}
        reorderTodos={reorderTodos}
      />
      <h2>Completed Todos</h2>
    <TodoList
      todos={completedTodos}
      toggleComplete={toggleComplete}
      removeTodo={removeTodo}
      editTodo={editTodo}
      reorderTodos={reorderTodos}
    />
    </div>
  );
}

export default App;
