import { useState } from "react";
import "./App.css";
import { addTodo } from "./api/getTodos";
import { Todo } from "./types";
import TodoCard from "./components/TodoCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useTodo from "./hooks/useTodo";

function App() {
   const todoList = useTodo();
   const queryClient = useQueryClient();
   const [content, setContent] = useState("");
   const [description, setDescription] = useState("");

   const { mutate, isPending } = useMutation({
      mutationFn: (newTodo: Todo) =>
         addTodo(newTodo.id, newTodo.content, newTodo.description),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["getTodos"] });
      },
   });

   const newTodo: Todo = {
      id: Math.random().toString(),
      content: content,
      description: description,
   };
   const handleAddTodo = async () => {
      await mutate(newTodo);
      setContent("");
      setDescription("");
   };

   return (
      <div className="flex flex-wrap flex-col w-full items-center">
         {todoList.todos?.data.map((todo) => (
            <div key={todo.id} className="w-1/2">
               <TodoCard todo={todo} />
            </div>
         ))}
         {isPending && (
            <div className="border-gray-50 rounded-md animate-pulse bg-gray-700 p-3 w-1/2 mt-3 h-20" />
         )}
         <div className="space-x-4 mt-4">
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
export default App;
