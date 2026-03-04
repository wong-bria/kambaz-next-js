import { create } from "zustand";

interface Todo {
  id: string;
  title: string;
}

interface TodoState {
  todos: Todo[];
  currentTodo: Todo;
  addTodo: () => void;
  updateTodo: () => void;
  deleteTodo: (id: string) => void;
  setCurrentTodo: (todo: Todo) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],

  currentTodo: { id: "3", title: "Learn Mongo" },

  setCurrentTodo: (todo) => set({ currentTodo: todo }),

  addTodo: () =>
    set((state) => {

      return {
        todos: [
          ...state.todos,
          { ...state.currentTodo, id: Date.now().toString() },
        ],
        currentTodo: { id: "", title: "" },
      };
    }),

  updateTodo: () =>
    set((state) => {

      return {
        todos: state.todos.map((t) =>
          t.id === state.currentTodo.id ? state.currentTodo : t
        ),
        currentTodo: { id: "", title: "" },
      };
    }),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
}));