// similar to context.tsx for counter

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Todo {
  id: string;
  title: string;
}

export interface TodoForm {
  id?: string;
  title: string;
}

// Define the context state
interface TodosContextState {
  todos: Todo[];
  todo: TodoForm;
  addTodo: () => void;
  updateTodo: () => void;
  deleteTodo: (id: string) => void;
  setTodo: (todo: TodoForm) => void;
}

// Create the context
const TodosContext = createContext<TodosContextState | undefined>(undefined);

// Create the provider component
export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);

  const [todo, setTodo] = useState<TodoForm>({ title: "Learn Mongo" });

  const addTodo = () => {
    const newTodos = [...todos, { ...todo, id: new Date().getTime().toString() }];
    setTodos(newTodos);
    setTodo({ title: "" });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = () => {
    const newTodos = todos.map((item) =>
      item.id === todo.id ? (todo as Todo) : item,
    );
    setTodos(newTodos);
    setTodo({ title: "" });
  };

  const value: TodosContextState = {
    todos,
    todo,
    addTodo,
    updateTodo,
    deleteTodo,
    setTodo,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

// Create a custom hook to use the todos context
// export const useTodos = () => {
//   const context = useContext(TodosContext);
//   return context;
// };

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};