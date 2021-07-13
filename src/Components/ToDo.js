import React, {useState} from 'react';
import ToDoForm from "./ToDoForm";
import {RiCloseCircleLine} from 'react-icons/ri';
import {TiEdit} from 'react-icons/ti';

function ToDo({todos, completeToDo, removeToDo, updatedTodo}) {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updatedTodo(edit.id, value)
    setEdit({
      id: null,
      value: ''
    })
  }

  if(edit.id){
    return <ToDoForm edit={edit} onSubmit={submitUpdate} />
  }

  return todos.map((todo, index) => (
    <div
    className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
    key={index}>

    <div key={todo.id} onClick={() => completeToDo(todo.id)}>
      {todo.text}
    </div>
    <div className="icons">
      <RiCloseCircleLine
      onClick={() => removeToDo(todo.id)}
      className="delete-icon"
       />
      <TiEdit
      onClick={() => setEdit({id: todo.id, value: todo.text})}
      className="edit-icon"
      />
    </div>
    </div>
    ))
}

export default ToDo
