import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux"; 
import { addTodo, updateTodo, setTodo } from "./todosreducer"; 
import { RootState } from "../../store"; 

export default function TodoForm() {
//   { todo, setTodo, addTodo, updateTodo }: { 
//   todo: { id: string; title: string }; 
//   setTodo: (todo: { id: string; title: string }) => void; 
//   addTodo: (todo: { id: string; title: string }) => void; 
//   updateTodo: (todo: { id: string; title: string }) => void; 
// })

  const { todo } = useSelector((state: RootState) => state.todosReducer); 
  const dispatch = useDispatch(); 
  return ( 
    <ListGroupItem> 
      {/* <Button onClick={() => addTodo(todo)}  */}
      <Button onClick={() => dispatch(addTodo(todo))}
              id="wd-add-todo-click"
              variant="success"
              className="float-end"> Add </Button> 
      {/* <Button onClick={() => updateTodo(todo)}  */}
      <Button onClick={() => dispatch(updateTodo(todo))}
              id="wd-update-todo-click"
              variant="warning"
              className="float-end me-2"> Update </Button> 
      <FormControl style={{ maxWidth: "280px" }}
                   value={todo.title} 
        // onChange={ (e) => setTodo({ ...todo, title: e.target.value }) }/> 
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}/>
    </ListGroupItem> 
);}