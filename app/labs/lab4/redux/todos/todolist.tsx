import { ListGroup } from "react-bootstrap";
import TodoForm from "./todoform";
import TodoItem from "./todoitem";
import { useSelector } from "react-redux"; 
import { RootState } from "../../store"; 

export default function TodoList() { 
  const { todos } = useSelector((state: RootState) => 
state.todosReducer);
  // const [todos, setTodos] = useState([ 
  //   { id: "1", title: "Learn React" }, 
  //   { id: "2", title: "Learn Node"  }]); 
  // const [todo, setTodo] = useState({ id: "-1", title: "Learn Mongo" }); 
  // const addTodo = (todo: any) => { 
  //   const newTodos = [ ...todos, { ...todo, 
  //     id: new Date().getTime().toString() }]; 
  //   setTodos(newTodos); 
  //   setTodo({id: "-1", title: ""}); 
  // }; 
  // const deleteTodo = (id: string) => {
  //    const newTodos = todos.filter((todo) => todo.id !== id); 
  //   setTodos(newTodos); 
  // }; 
  // const updateTodo = (todo: any) => { 
  //   const newTodos = todos.map((item) => 
  //     (item.id === todo.id ? todo : item)); 
  //   setTodos(newTodos); 
  //   setTodo({id: "-1", title: ""}); 
  // }; 
  return ( 
    <div id="wd-todo-list-redux"> 
      <h2>Todo List</h2> 
      <ListGroup> 
        <TodoForm/>
         {todos.map((todo: any) => ( 
          <TodoItem todo={todo} /> 
        ))} 

        {/* <TodoForm 
          todo={todo} 
          setTodo={setTodo} 
          addTodo={addTodo} 
          updateTodo={updateTodo}/> 
        {todos.map((todo) => ( 
          <TodoItem 
            todo={todo} 
            deleteTodo={deleteTodo} 
            setTodo={setTodo} /> 
        ))}  */}


        {/* <ListGroupItem> 
          <Button onClick={() => addTodo(todo)} 
                  id="wd-add-todo-click"> Add </Button> 
          <Button onClick={() => updateTodo(todo)} 
                  id="wd-update-todo-click"> Update </Button> 
          <FormControl value={todo.title} 
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}/> 
        </ListGroupItem> 
        {todos.map((todo) => ( 
          <ListGroupItem key={todo.id}> 
            <Button onClick={() => deleteTodo(todo.id)} 
                    id="wd-delete-todo-click"> Delete </Button> 
            <Button onClick={() => setTodo(todo)} 
                    id="wd-set-todo-click"> Edit </Button> 
            {todo.title} 
          </ListGroupItem> 
        ))}  */}
      </ListGroup>
      <hr/> 
    </div>
);} 