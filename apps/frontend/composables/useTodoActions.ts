import {
  type Todo,
  type TodoStatus,
  TodoActionEnum,
  type TodoAction,
  type CreateTodoPayload,
} from "@repo/types";

export const useTodoActions = () => {
  const handleStatusChange = (todo: Todo, newStatus: TodoStatus) => {
    const action: TodoAction = {
      type: "update",
      payload: {
        id: todo.id,
        status: newStatus,
      },
    };
    return action;
  };

  const handleDelete = (todo: Todo) => {
    const action: TodoAction = {
      type: "delete",
      payload: {
        id: todo.id,
      },
    };
    return action;
  };

  const handleCreate = (newTodo: CreateTodoPayload) => {
    const action: TodoAction = {
      type: "create",
      payload: newTodo,
    };
    return action;
  };

  return {
    handleStatusChange,
    handleDelete,
    handleCreate,
  };
};
