import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const TodoItem = ({
  todo,
  todosArr,
  setTodosArr,
  setCompleted,
  setDeleted,
  setTotalTodos,
  deleted,
  setOldValue,
  setUpdate,
  setOldTodo,
  priority,
}) => {
  const completeTodo = () => {
    for (let item of todosArr) {
      if (item.id === todo.id) {
        item.isComplete = !todo.isComplete;
      }
    }
    setTodosArr([...todosArr]);
    setCompleted(todosArr.filter((item) => item.isComplete).length);
    localStorage.setItem('todos', JSON.stringify([...todosArr]));
  };

  const deleteTodo = () => {
    const index = todosArr.findIndex((item) => item.id === todo.id);
    todosArr.splice(index, 1);
    setTodosArr([...todosArr]);
    setTotalTodos(todosArr.length);
    setDeleted(deleted + 1);
    localStorage.setItem('todos', JSON.stringify([...todosArr]));
  };

  const editTodo = () => {
    // todo edit functionality
    setOldValue(todo.value);
    setOldTodo(todo);
    setUpdate(true);
  };

  const hasPriority = (targetPriority) => {
    return todosArr.some((todo) => todo.priority == targetPriority);
  };

  const getPriorities = () => {
    let options = [];
    for (let i = 1; i <= priority; i++) {
      if (hasPriority(i)) continue;
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const setOrder = (e) => {
    todo.priority = e.target.value;
    todosArr.forEach((item, index) => {
      if (item.id === todo.id) {
        todosArr[index].priority = todo.priority;
      }
    });
    todosArr.sort((a, b) => a.priority - b.priority);
    setTodosArr(todosArr);
    localStorage.setItem('todos', JSON.stringify(todosArr));
  };

  return (
    <div className='todoItem'>
      <div className='content'>
        <input
          type='checkbox'
          onChange={completeTodo}
          checked={todo.isComplete}
        />
        <p className={todo.isComplete ? 'completed' : ''}>{todo.value}</p>
      </div>
      <div className='cta'>
        Priority{' '}
        <select onChange={setOrder}>
          <option>{todo.priority}</option>
          <option value='0'>0</option>
          {getPriorities()}
        </select>
        <button title='Edit Item' onClick={editTodo}>
          <FaEdit />
        </button>
        <button title='Delete Item' onClick={deleteTodo}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
