// similar to index.tsx for counter

"use client";

import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useTodos } from "./todosContext";

export default function TodoContext() {
  const { todos, todo, addTodo, updateTodo, deleteTodo, setTodo } = useTodos();

  return (
    <div id="wd-todo-list-context">
      <h2>Todo List</h2>

      <ListGroup>
        <ListGroupItem>
          <FormControl
            style={{ maxWidth: "240px" }}
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            className="float-start"
          />
          <Button variant="success" className="float-end" onClick={addTodo}>
            Add
          </Button>
          <Button
            variant="warning"
            className="float-end me-2"
            onClick={updateTodo}
          >
            Update
          </Button>
        </ListGroupItem>

        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            {todo.title}
            <Button
              onClick={() => deleteTodo(todo.id)}
              className="float-end"
              variant="danger"
            >
              Delete
            </Button>
            <Button
              onClick={() => setTodo(todo)}
              className="float-end me-2"
              variant="primary"
            >
              Edit
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
