// ToDoList.jsx
import React, { useState, useEffect } from "react"; // 🟢 Added useEffect
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDo";

// Helper function to safely load data from localStorage
const getInitialData = () => {
  const data = localStorage.getItem("todos");
  // If data exists, parse it; otherwise, return an empty array
  return data ? JSON.parse(data) : [];
};

function ToDoList() {
  // 🟢 Change 1: Initialize state using the function that loads from localStorage
  const [todos, setTodos] = useState(getInitialData);

  // 🟢 Change 2: Save todos to localStorage whenever the 'todos' state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // Dependency array: runs only when 'todos' changes

  const addToDo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const updatedTodo = (todoId, newValue) => {
    // NOTE: newValue from ToDoForm is currently { id: X, text: Y }
    // This function needs to handle the fact that newValue is missing isComplete property
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => {
        // Find the item being edited, preserve its isComplete status
        if (item.id === todoId) {
          return {
            id: todoId, // Use the correct ID from the function argument
            text: newValue.text, // Use the new text
            isComplete: item.isComplete, // Preserve the original status
          };
        }
        return item;
      })
    );
  };

  const removeToDo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const completeToDo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>What's the plan for today?</h1>
      <ToDoForm onSubmit={addToDo} />
      <ToDo
        todos={todos}
        completeToDo={completeToDo}
        removeToDo={removeToDo}
        updatedTodo={updatedTodo}
      />
    </div>
  );
}

export default ToDoList;
