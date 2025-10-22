import { useEffect, useState } from 'react'
import AddTodoForm from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => {
        if(!response.ok) {
          throw new Error ("Failed to fetch todos");
        }
        return response.json();
      })
      .then((data) => {
        //записываем данные в стейт
        setTodos(data);
        //выключает загрузку
        setLoading(false);
      })
      .catch((err) => {
        //записываем ошибку в стейт
        setError(err.message);
        setLoading(false);
      });
  }, []);

  //чтобы добавить новый туду и передать в addtodoform
  const handleAddTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title: title,
      completed: false,
    };
    //обновляем стейт тоесть доб новый туду в начало списка
    setTodos([newTodo, ...todos]);
  };

  //чтобы удалить туду, передается в туту лист
  const handleDeleteTodo = (idDelete) => {
    //Обновляем state, фильтруя массив (оставляем все, КРОМЕ id)
    setTodos(todos.filter((todo) => todo.id !== idDelete));
  }

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

  //если загрузка идет показываем это
  if (loading){
    return <div>Загрузка списка дел...</div>;
  }

  //если ошибка то это
  if (error){
    return <div>Ошибка: {error}</div>
  }
  //если все ок
  return(
    <div className='App'>
      <h1>My To-Do List</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />

      <TodoList 
        todos={todos} 
        onDeleteTodo={handleDeleteTodo} 
        onToggleComplete={handleToggleComplete}
        />
    </div>
  )
}

export default App
