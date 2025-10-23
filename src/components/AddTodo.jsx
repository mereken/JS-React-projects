import { useState } from "react";
import './AddTodo.css';

function AddTodoForm({onAddTodo}) {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        if (title.trim() === '') {
            return;
        }
        onAddTodo(title, dueDate);
        setTitle('');
        setDueDate('');
    }
    return ( 
        <div className="add-todo"> 
            <form onSubmit={handleSubmit} className="add-todo-form">
                <input 
                    className="date-input"
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                />
                <input
                    className="text-input"
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