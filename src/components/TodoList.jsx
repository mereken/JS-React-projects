import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({todos, onDeleteTodo, onToggleComplete}) {
    return (
        <ul className='todo-list'> 
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={onDeleteTodo}
                    onToggle={onToggleComplete}
                />
            ))}
        </ul>
        
    );
}
export default TodoList;