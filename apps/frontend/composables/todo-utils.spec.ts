import { sortTodos } from "./todo-utils";
import { ref } from "vue";
import type { Todo, TodoStatus } from "@repo/types";

describe("sortTodos", () => {
  it("should sort todos by status correctly", () => {
    const todos = ref<Todo[]>([
      {
        id: "1",
        title: "Todo 1",
        description: "",
        status: "completed" as TodoStatus,
      },
      {
        id: "2",
        title: "Todo 2",
        description: "",
        status: "pending" as TodoStatus,
      },
      {
        id: "3",
        title: "Todo 3",
        description: "",
        status: "doing" as TodoStatus,
      },
    ]);

    const sorted = sortTodos(todos);

    expect(sorted).toEqual([
      { id: "3", title: "Todo 3", description: "", status: "doing" },
      { id: "2", title: "Todo 2", description: "", status: "pending" },
      { id: "1", title: "Todo 1", description: "", status: "completed" },
    ]);
  });

  it("should return an empty array if todos ref is empty", () => {
    const todos = ref<Todo[]>([]);
    const sorted = sortTodos(todos);
    expect(sorted).toEqual([]);
  });
});
