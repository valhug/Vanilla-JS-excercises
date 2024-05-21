import React, { useState } from 'react';
import {DragDropContext,Droppable, Draggable} from 'react-beautiful-dnd'

function TodoItem({ todo, toggleComplete, removeTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <div>
          <span
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.priority === 'high'? 'red' : todo.priority === 'medium' ? 'orange' : 'green'
          }}
        >
          {todo.text}
        </span>
        <span>{todo.dueDate}</span>
        <span>{todo.priority}</span>
        <span>{todo.category}</span>
        </div>
        
      )}
      <button onClick={() => toggleComplete(todo.id)}>Complete</button>
      <button onClick={() => removeTodo(todo.id)}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
      {isEditing && <button onClick={handleSave}>Save</button>}
    </li>
  );
}

function TodoList({ todos, toggleComplete, removeTodo, editTodo, reorderTodos }) {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    reorderTodos(result.source.index, result.destination.index);
  };


  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItem
                      todo={todo}
                      toggleComplete={toggleComplete}
                      removeTodo={removeTodo}
                      editTodo={editTodo}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
