import axios from "axios";

const getTodos = () => {
   return axios.get("/tasks");
};

const getTodo = (id: string) => {
   return axios.get(`/tasks/${id}`);
};

const deleteTodo = (id: string) => {
   return axios.delete(`/tasks/${id}`);
};

const updateTodo = (id: string, content: string, description: string) => {
   return axios.post(`/tasks/${id}`, { content, description });
};

const addTodo = (id: string, content: string, description: string) => {
   return axios.post("/tasks", { content, description });
};

export { getTodos, addTodo, getTodo, updateTodo, deleteTodo };
