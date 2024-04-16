import { ChangeEvent, FC } from "react";
import { useDispatch } from "react-redux";
import { Todo } from "../store/todoSlice";
import { PayloadAction } from "@reduxjs/toolkit";
interface TextFieldProps {
   field: "content" | "description";
   action: (todo: Todo) => PayloadAction<Todo>;
   inputValues: {
      content: string;
      description: string;
   };
}

const TextField: FC<TextFieldProps> = ({ field, action, inputValues }) => {
   const dispatch = useDispatch();
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const todoUpdate: Todo = { ...inputValues, [field]: value };
      dispatch(action(todoUpdate));
   };

   return (
      <input
         className="w-60 h-10 p-2 rounded-md"
         placeholder={field}
         name={field}
         defaultValue={inputValues[field]}
         type="text"
         onChange={handleChange}
      />
   );
};

export default TextField;
