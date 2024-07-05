const AddTodo = ({ addTodo, oldValue, setOldValue, update, updateTodo }) => {
  const setValue = (e) => {
    setOldValue(e.target.value);
  };

  return (
    <div className='todoForm'>
      <h1>To Do List</h1>
      <form onSubmit={update ? updateTodo : addTodo}>
        <input
          type='text'
          placeholder='Enter your todo...'
          name='todoInput'
          onChange={setValue}
          value={oldValue}
          required
        />
        <button type='submit'>{update ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default AddTodo;
