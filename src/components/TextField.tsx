import { ChangeEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../store/todoSlice";

import { RootState } from "../store/store";
import { PayloadAction } from "@reduxjs/toolkit";
interface TextFieldProps {
   field: "content" | "description";
   action: (todo: Todo) => PayloadAction<Todo>;
}
const TextField: FC<TextFieldProps> = ({ field, action }) => {
   const dispatch = useDispatch();
   const fieldValue = useSelector((state: RootState) => state.todo);
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const todoUpdate: Todo = { ...fieldValue, [field]: value };
      dispatch(action(todoUpdate));
   };

   return (
      <>
         <input
            className="p-2"
            placeholder={field}
            name={field}
            value={fieldValue[field]}
            type="text"
            onChange={handleChange}
         />
      </>
   );
};

export default TextField;

//action: ActionCreatorWithPayload<{ field: string; value: string }, string>;
/* <TextField slice="todo" field="content" action={setTodo} />
<TextField slice="todo" field="description" action={setTodo} /> */
