import { useNavigate, useParams } from "react-router-dom";
import { getTodo, updateTodo } from "../api/getTodos";
import TextField from "./TextField";
import { setTodo } from "../store/todoSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Todo = () => {
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const { id } = useParams<{ id: string }>();
   const fieldValue = useSelector((state: RootState) => state.todo);
   const [inputValues, setInputValues] = useState({
      content: "",
      description: "",
   });

   if (!id) {
      return <div>Todo not found.</div>;
   }

   const { data, isLoading } = useQuery({
      queryKey: ["getTodo", id],
      queryFn: () => getTodo(id),
   });

   useEffect(() => {
      if (data?.data) {
         const { content, description } = data?.data;
         setInputValues({
            content: content || "",
            description: description || "",
         });
      }
   }, [data]);
   return (
      <div className="space-x-4">
         {isLoading ? (
            <div className="flex space-x-4">
               <div className="w-60 border-gray-50 rounded-md animate-pulse bg-gray-700 p-3 h-10" />
               <div className="w-60 border-gray-50 rounded-md animate-pulse bg-gray-700 p-3 h-10" />
               <div className="w-16 border-gray-50 rounded-md animate-pulse bg-gray-700 p-2 h-10" />
            </div>
         ) : (
            <>
               <TextField
                  inputValues={inputValues}
                  field="content"
                  action={setTodo}
               />
               <TextField
                  inputValues={inputValues}
                  field="description"
                  action={setTodo}
               />
               <button
                  className="bg-blue-700 text-white p-2 w-16"
                  onClick={async () => {
                     await updateTodo(
                        id,
                        fieldValue.content,
                        fieldValue.description
                     );
                     navigate("/");
                     queryClient.invalidateQueries({ queryKey: ["getTodos"] });
                     queryClient.invalidateQueries({ queryKey: ["getTodo"] });
                  }}
               >
                  SAVE
               </button>
            </>
         )}
      </div>
   );
};

export default Todo;
