import { ListGroupItem, Button } from "react-bootstrap";
import { useDispatch } from "react-redux"; 
import { deleteTodo, setTodo } from "./todosreducer";

export default function TodoItem({ todo, 
  // deleteTodo, setTodo
 }
//  : { 
//   todo: { id: string; title: string }; 
//   deleteTodo: (id: string) => void; 
//   setTodo: (todo: { id: string; title: string }) => void; 
// }
) { 
  const dispatch = useDispatch();
  return ( 
    <ListGroupItem key={todo.id}>
      {/* <Button onClick={() => deleteTodo(todo.id)}  */}
      <Button onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click"
              className="float-end"
              variant="danger"> Delete </Button> 
      {/* <Button onClick={() => setTodo(todo)}  */}
      <Button onClick={() => dispatch(setTodo(todo))} 
              id="wd-set-todo-click"
              className="float-end me-2"
              variant="primary"> Edit </Button> 
      {todo.title}    </ListGroupItem>);} 