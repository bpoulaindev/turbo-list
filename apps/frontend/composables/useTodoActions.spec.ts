import { useTodoActions } from "./useTodoActions";
import type { Todo, TodoStatus } from "@repo/types";

describe("useTodoActions", () => {
  const { handleStatusChange, handleDelete, handleCreate } = useTodoActions();

  it("should create a status change action", () => {
    const todo: Todo = {
      id: "1",
      title: "Test",
      description: "Test",
      status: "pending" as TodoStatus,
    };
    const newStatus: TodoStatus = "doing" as TodoStatus;
    const action = handleStatusChange(todo, newStatus);

    expect(action).toEqual({
      type: "update",
      payload: {
        id: "1",
        status: "doing",
      },
    });
  });

  it("should create a delete action", () => {
    const todo: Todo = {
      id: "1",
      title: "Test",
      description: "Test",
      status: "pending" as TodoStatus,
    };
    const action = handleDelete(todo);

    expect(action).toEqual({
      type: "delete",
      payload: {
        id: "1",
      },
    });
  });

  it("should create a create action", () => {
    const newTodo = {
      title: "New Todo",
      description: "New Desc",
      status: "pending" as TodoStatus,
    };
    const action = handleCreate(newTodo);

    expect(action).toEqual({
      type: "create",
      payload: newTodo,
    });
  });
});
