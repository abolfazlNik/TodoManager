import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "axios";
import { RouterProvider } from "react-router-dom";
import router from "./config/router.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

axios.defaults.baseURL = import.meta.env.VITE_TODOIST_URL;
console.log("axios", axios.defaults.baseURL);

axios.defaults.headers.common["Authorization"] = `Bearer ${
   import.meta.env.VITE_TODOIST_KEY
}`;

ReactDOM.createRoot(document.getElementById("root")!).render(
   <Provider store={store}>
      <RouterProvider router={router} />
   </Provider>
);
