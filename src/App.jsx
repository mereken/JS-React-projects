import { useEffect, useState } from 'react'
import AddTodoForm from './components/AddTodo';
import TodoList from './components/TodoList';
import SearchInput from './components/SearchInput';
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => {
        if(!response.ok) {
          throw new Error ("Failed to fetch todos");
        }
        return response.json();
      })
      .then((data) => {
        const initialTodos = data.map(todo => ({
            ...todo,
            dueDate: null 
        }));
        setTodos(initialTodos);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddTodo = (title, date) => {
    const newTodo = {
      id: Date.now(),
      title: title,
      completed: false,
      dueDate: date,
    };
    setTodos([newTodo, ...todos]);
  };

  const handleDeleteTodo = async (idDelete) => { 
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${idDelete}`, {
            method: 'DELETE', 
        });
        
        if (!response.ok) {
            throw new Error('Server error on delete');
        }

        setTodos(todos.filter((todo) => todo.id !== idDelete));

    } catch (error) {
        alert(`Не удалось удалить задачу: ${error.message}`); 
    }
};

  const handleToggleComplete = (idToggle) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === idToggle) {
          return {...todo, completed: !todo.completed};
        }
        return todo;
      })
    );
  };

  if (loading){
    return <div>Загрузка списка дел...</div>;
  }

  if (error){
    return <div>Ошибка: {error}</div>
  }

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return(
    <div className='App'>
      <h1>My To-Do List</h1>
      <SearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <AddTodoForm onAddTodo={handleAddTodo} />

      <TodoList 
        todos={filteredTodos}
        onDeleteTodo={handleDeleteTodo} 
        onToggleComplete={handleToggleComplete}
        />
    </div>
  )
}

export default App
