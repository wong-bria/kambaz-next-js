"use client";

import { useTodoStore } from "./useTodoStore";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";

export default function ZustandTodoList() {
  const { todos, currentTodo, setCurrentTodo, addTodo, updateTodo, deleteTodo } = useTodoStore();

  return (
    <div className="m-2">
      <h2>Todo List</h2>

      <ListGroup>
        <ListGroupItem className="d-flex align-items-center gap-2">
          <FormControl
            value={currentTodo.title}
            onChange={(e) =>
              setCurrentTodo({
                ...currentTodo,
                title: e.target.value,
              })
            }
          />

          <Button variant="warning" onClick={updateTodo}>
            Update
          </Button>

          <Button variant="success" onClick={addTodo}>
            Add
          </Button>
        </ListGroupItem>

        {todos.map((todo) => (
          <ListGroupItem
            key={todo.id}
            className="d-flex align-items-center"
          >
            {todo.title}

            <div className="ms-auto d-flex gap-2">
              <Button
                variant="primary"
                onClick={() => setCurrentTodo(todo)}
              >
                Edit
              </Button>

              <Button
                variant="danger"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}