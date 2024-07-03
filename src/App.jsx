import { useState, useEffect } from 'react';
import './App.css';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';

function App() {
  const [totalTodos, setTotalTodos] = useState(0);
  const [todosArr, setTodosArr] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [deleted, setDeleted] = useState(0);
  const [oldValue, setOldValue] = useState();
  const [update, setUpdate] = useState(false);
  const [oldTodo, setOldTodo] = useState({});
  const [priority, setPriority] = useState(0);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodosArr(storedTodos);
    setTotalTodos(storedTodos.length);
    setCompleted(storedTodos.filter((item) => item.isComplete).length);
    setPriority(storedTodos.length);
  });

  const generateId = () => {
    let newId;
    do {
      newId = Math.floor(Math.random() * 1000) + 1000;
    } while (todosArr.find((todo) => todo.id === newId));
    return newId;
  };

  const addTodo = (e) => {
    e.preventDefault();
    const todoInput = e.target.todoInput;
    let newTodo = {
      id: generateId(),
      isComplete: false,
      value: todoInput.value,
      priority: 0,
    };
    const updatedTodosArr = [...todosArr, newTodo];
    setTodosArr(updatedTodosArr);
    setOldValue('');
    setTotalTodos(updatedTodosArr.length);
    localStorage.setItem('todos', JSON.stringify(updatedTodosArr));
    setPriority(updatedTodosArr.length);
  };

  const updateTodo = (e) => {
    e.preventDefault();
    oldTodo.value = e.target.todoInput.value;
    // const idx = todosArr.findIndex((item) => item.id === oldTodo.id);
    todosArr.forEach((item, index) => {
      if (item.id === oldTodo.id) {
        todosArr[index].value = oldTodo.value;
      }
    });
    setTodosArr(todosArr);
    localStorage.setItem('todos', JSON.stringify(todosArr));
    setOldValue('');
    setUpdate(false);
  };

  return (
    <>
      <AddTodo
        addTodo={addTodo}
        updateTodo={updateTodo}
        oldValue={oldValue}
        setOldValue={setOldValue}
        update={update}
      />
      <div className='container'>
        <p>
          Total Todos : <strong>{totalTodos}</strong> | Completed :
          <strong> {completed}</strong> | Deleted : <strong>{deleted}</strong>
        </p>
        <div className='todoList'>
          {todosArr.map((todo) => (
            <TodoItem
              todo={todo}
              todosArr={todosArr}
              isComplete={todo.isComplete}
              setTodosArr={setTodosArr}
              setCompleted={setCompleted}
              setDeleted={setDeleted}
              setTotalTodos={setTotalTodos}
              deleted={deleted}
              key={todo.id}
              setOldValue={setOldValue}
              setUpdate={setUpdate}
              setOldTodo={setOldTodo}
              priority={priority}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
