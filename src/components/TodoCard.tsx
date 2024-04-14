import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types";
import { deleteTodo } from "../api/getTodos";
import { Link } from "react-router-dom";

const TodoCard = ({ todo }: { todo: Todo }) => {
   const queryClient = useQueryClient();
   const { mutate, isPending } = useMutation({
      mutationFn: (id: string) => deleteTodo(id),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["getTodos"] });
      },
   });

   return (
      <div className="p-3 w-full cursor-pointer relative">
         {isPending ? (
            <div className="border blur-[1px] bg-gray-500 p-3 h-20 flex align-baseline justify-between">
               <div className="flex flex-col">
                  <div className="">{todo.content}</div>
                  <div className="text-gray-200">{todo.description}</div>
               </div>
            </div>
         ) : (
            <Link
               to={`/todo/${todo.id}`}
               className="border border-gray-50 p-3 h-20 flex align-baseline justify-between"
            >
               <div className="flex flex-col">
                  <div className="">{todo.content}</div>
                  <div className="text-gray-200">{todo.description}</div>
               </div>
            </Link>
         )}
         {!isPending && (
            <div
               className="absolute top-7 right-7 text-red-500"
               onClick={() => mutate(todo.id)}
            >
               Delete
            </div>
         )}
      </div>
   );
};

export default TodoCard;
