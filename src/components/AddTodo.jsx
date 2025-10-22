import { useState } from "react";
import './AddTodo.css';

function AddTodoForm({onAddTodo}) {
    const [title, setTitle] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        if (title.trim() === '') {
            return;
        }
        onAddTodo(title);
        setTitle('');
    }
    return ( 
        <div className="add-todo"> 
            <form onSubmit={handleSubmit} className="add-todo-form">
                <input
                type="text"
                placeholder="enter new task"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                />
                <button type="submit">Add</button>
            </form>
       </div> 
    )
    
}
export default AddTodoForm;