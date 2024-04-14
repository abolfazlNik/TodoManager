import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/getTodos";
import { Todo } from "../types";

const useTodo = () => {
   const {
      data: todos,
      refetch,
      isLoading,
   } = useQuery<{ data: Todo[] }>({
      queryKey: ["getTodos"],
      queryFn: getTodos,
   });
   return { todos, isLoading, refetch };
};

export default useTodo;
