import { useEffect, useState } from 'react'
import './App.css'
import { addTodo, getTodos } from './api/getTodos'
import { Todo } from './types'
import TodoCard from './components/TodoCard'
import { Link } from 'react-router-dom'

function App() {
  const [content , setContent] = useState("")
  const [description , setDescription] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])
  async function getData(){
    const {data} =  await getTodos()
    setTodos(data)
  }
  useEffect(() => {
    getData()
  }, [])
  const handleAddTodo = async () => {
    await addTodo(content , description)
    setContent('')
    setDescription('')
    getData()
  }
  return (
    <div className='flex flex-wrap flex-col w-full items-center'>
      {todos.map((todo) =>(
       <Link key={todo.id} className='w-1/2' to={`/todo/${todo.id}`}>
        <TodoCard todo={todo} key={todo.id}/>
       </Link>
      ))}
      <div className="">
        <input placeholder='content' type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        <input placeholder='description' type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={() => handleAddTodo()}
      >ADD</button>
      </div>
    </div>
  )
}

export default App
