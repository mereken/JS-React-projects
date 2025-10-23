import './TodoItem.css'
function TodoItem({todo, onDelete, onToggle}) {
    const handleDeleteClick = () => {
        onDelete(todo.id);
    };

    const handleToggleClick = () => {
        onToggle(todo.id);
    };

    return (
        <li>
            <input 
                className='todo-checkbox'
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggleClick}
            />
        <div className="todo-content">
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
            </span>
        
            {todo.dueDate && <small className="due-date">Срок: {todo.dueDate}</small>}
        </div>

            <button className='delete-btn' onClick={handleDeleteClick}>Delete</button>
        </li>
    );
}

export default TodoItem;