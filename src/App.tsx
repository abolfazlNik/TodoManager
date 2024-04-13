import { useEffect, useState } from "react";
import "./App.css";
import { addTodo, getTodos } from "./api/getTodos";
import { Todo } from "./types";
import TodoCard from "./components/TodoCard";
import { Link } from "react-router-dom";

function App() {
   const [content, setContent] = useState("");
   const [description, setDescription] = useState("");
   const [todos, setTodos] = useState<Todo[]>([]);
   async function getData() {
      const { data } = await getTodos();
      setTodos(data);
   }
   useEffect(() => {
      getData();
   }, []);
   const handleAddTodo = async () => {
      await addTodo(content, description);
      setContent("");
      setDescription("");
      getData();
   };
   return (
      <div className="flex flex-wrap flex-col w-full items-center">
         {todos.map((todo) => (
            <Link key={todo.id} className="w-1/2" to={`/todo/${todo.id}`}>
               <TodoCard todo={todo} key={todo.id} />
            </Link>
         ))}
         <div className="space-x-4">
            <input
               className="p-2"
               placeholder="content"
               type="text"
               value={content}
               onChange={(e) => setContent(e.target.value)}
            />
            <input
               className="p-2"
               placeholder="description"
               type="text"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
            />
            <button
               className="bg-blue-700 text-white p-2"
               onClick={() => handleAddTodo()}
            >
               ADD
            </button>
         </div>
      </div>
   );
}
{
   /* <TextField slice="todo" field="content" action={setTodo} />
<TextField slice="todo" field="description" action={setTodo} /> */
}
export default App;
