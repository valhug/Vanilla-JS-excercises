import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [todo, setTodo] = useState('');
  const [dueDate, setDueDate] = useState("");
  const [priority,setPriority] = useState('medium');
  const [category,setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      id: Date.now(),
      text: todo,
      completed: false,
      dueDate: dueDate,
      priority: priority,
      category: category
    });
    setTodo('');
    setDueDate('')
    setPriority('medium');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={todo} 
        onChange={(e) => setTodo(e.target.value)} 
        placeholder="Add a todo" 
      />
      <input
      type="date"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
    />
    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
    <input
      type="text"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      placeholder="Add a category"
    />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
