import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Todo from "../components/Todo";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
      path: "/todo/:id",
      element: <Todo/>,
    },
  ]);

export default router