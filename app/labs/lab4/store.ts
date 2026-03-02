import { configureStore } from "@reduxjs/toolkit"; 
import helloReducer from "./redux/hello/helloreducer"; 
import counterReducer from "./redux/counterredux/counterreducer";
import addReducer from "./redux/addredux/addreducer";
import todosReducer from "./redux/todos/todosreducer";

const store = configureStore({ 
  reducer: { helloReducer,
             counterReducer,
              addReducer,
              todosReducer,
   }}); 
export type RootState = ReturnType<typeof store.getState>; 
export default store; 