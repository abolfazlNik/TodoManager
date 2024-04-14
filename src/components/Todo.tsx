import { useNavigate, useParams } from "react-router-dom";
import { getTodo, updateTodo } from "../api/getTodos";
import TextField from "./TextField";
import { setTodo } from "../store/todoSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useQuery } from "@tanstack/react-query";

const Todo = () => {
   const navigate = useNavigate();
   const { id } = useParams<{ id: string }>();
   const fieldValue = useSelector((state: RootState) => state.todo);

   if (!id) {
      return <div>Todo not found.</div>;
   }

   // const { data, isLoading } = useQuery({
   //    queryKey: ["getTodo"],
   //    queryFn: () => getTodo(id),
   // });

   return (
      <div className="space-x-4">
         {/* {isLoading ? (
            <div className="flex space-x-4">
               <div className="w-60 border-gray-50 rounded-md animate-pulse bg-gray-700 p-3 h-10" />
               <div className="w-60 border-gray-50 rounded-md animate-pulse bg-gray-700 p-3 h-10" />
               <div className="w-16 border-gray-50 rounded-md animate-pulse bg-gray-700 p-2 h-10" />
            </div>
         ) : ( */}
         <>
            <TextField field="content" action={setTodo} />
            <TextField field="description" action={setTodo} />
            <button
               className="bg-blue-700 text-white p-2 w-16"
               onClick={async () => {
                  await updateTodo(
                     id,
                     fieldValue.content,
                     fieldValue.description
                  );
                  navigate("/");
               }}
            >
               SAVE
            </button>
         </>
         {/* )} */}
      </div>
   );
};

export default Todo;
