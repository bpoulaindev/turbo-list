import type { Todo, TodoAction, TodoStatus } from "@repo/types";
import type { Ref } from "vue";

export function sortTodos(todos: Ref<Todo[]>): Todo[] {
  const sortByStatus = (a: Todo, b: Todo) => {
    const statusOrder: { [key in TodoStatus]: number } = {
      doing: 1,
      pending: 2,
      completed: 3,
    };

    return statusOrder[a.status] - statusOrder[b.status];
  };

  return [...todos.value].sort(sortByStatus);
}

export function updateTodo(todos: Ref<Todo[]>, action: TodoAction): void {
  if (
    action.payload &&
    typeof action.payload === "object" &&
    "id" in action.payload &&
    !Array.isArray(action.payload)
  ) {
    const index = todos.value.findIndex(
      // @ts-ignore
      (todo) => todo.id === action.payload.id,
    );
    if (index === -1) {
      return;
    }
    todos.value[index] = { ...todos.value[index], ...action.payload };
  }
}

export function createTodo(todos: Ref<Todo[]>, action: TodoAction): void {
  if (action.payload && isTodo(action.payload)) {
    todos.value.push(action.payload);
  }
}

export function deleteTodo(todos: Ref<Todo[]>, action: TodoAction): void {
  if (action.payload && action.payload.id) {
    // @ts-ignore
    todos.value = todos.value.filter((t) => t.id !== action.payload.id);
  }
}

function isTodo(obj: any): obj is Todo {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "string" &&
    typeof obj.title === "string" &&
    (obj.status === "pending" ||
      obj.status === "doing" ||
      obj.status === "completed")
  );
}
