import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Todo {
   content: string;
   description: string;
}

const initialState: Todo = {
      content: "",
      description: "",
};

const todoSlice = createSlice({
   name: "todo",
   initialState,
   reducers: {
      setTodo: (state, action: PayloadAction<Todo>) => {
         const { content, description } = action.payload;
         state.content = content;
         state.description = description;
      },
   },
});

export const { setTodo } = todoSlice.actions;
export default todoSlice.reducer;
