import { useNavigate, useParams } from "react-router-dom";
import { updateTodo } from "../api/getTodos";
import TextField from "./TextField";
import { setTodo } from "../store/todoSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Todo = () => {
   const navigate = useNavigate();
   const { id } = useParams<{ id: string }>();
   const fieldValue = useSelector((state: RootState) => state.todo);

   if (!id) {
      return <></>;
   }
   return (
      <div className="space-x-4">
         <TextField field="content" action={setTodo} />
         <TextField field="description" action={setTodo} />
         <button
            className="bg-blue-700 text-white p-2"
            onClick={async () => {
               await updateTodo(id, fieldValue.content, fieldValue.description);
               navigate("/");
            }}
         >
            SAVE
         </button>
      </div>
   );
};

export default Todo;
