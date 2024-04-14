import { ChangeEvent, FC, useEffect } from "react";
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
            className="w-60 h-10 p-2 rounded-md"
            placeholder={field}
            name={field}
            defaultValue={fieldValue[field]}
            type="text"
            onChange={handleChange}
         />
      </>
   );
};

export default TextField;
