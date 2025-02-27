import { useTodos } from "@/composables/useTodos";
import { Todo, TodoStatus, TodoAction } from "@repo/types";

// Mock fetch
global.fetch = jest.fn();

const mockFetch = (
  responseData: any,
  ok: boolean = true,
  status: number = 200,
) => {
  (global.fetch as jest.Mock).mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(responseData),
    text: () => Promise.resolve(JSON.stringify(responseData)),
  });
};

describe("useTodos Composable", () => {
  let useTodosResult: ReturnType<typeof useTodos>;

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock useRuntimeConfig before calling useTodos
    // @ts-ignore
    global.useRuntimeConfig = () => ({
      public: { apiBaseUrl: "http://localhost:4000" },
    });
    useTodosResult = useTodos();
    mockFetch([]); // Mock initial fetch
  });

  it("fetches todos successfully", async () => {
    const mockTodos: Todo[] = [
      {
        id: "1",
        title: "Test Todo",
        description: "Test Desc",
        status: "pending",
      },
    ];
    mockFetch(mockTodos);

    await useTodosResult.fetchTodos();

    expect(useTodosResult.loading.value).toBe(false);
    expect(useTodosResult.error.value).toBeNull();
    expect(useTodosResult.todos.value).toEqual(mockTodos);
    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/todos");
  });

  it("handles fetch error", async () => {
    mockFetch(null, false, 500);

    await useTodosResult.fetchTodos();

    expect(useTodosResult.loading.value).toBe(false);
    expect(useTodosResult.error.value).toBe("Failed to fetch todos");
  });

  it("creates a todo successfully", async () => {
    const newTodo: Omit<Todo, "id"> = {
      title: "New Todo",
      description: "New Desc",
      status: "pending",
    };
    const createdTodo: Todo = { id: "2", ...newTodo };
    mockFetch(createdTodo);

    await useTodosResult.createTodo(newTodo);

    expect(useTodosResult.loading.value).toBe(false);
    expect(useTodosResult.error.value).toBeNull();
    expect(useTodosResult.todos.value).toContainEqual(createdTodo);
    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });
  });

  it("handles create todo error", async () => {
    const newTodo: Omit<Todo, "id"> = {
      title: "New Todo",
      description: "New Desc",
      status: "pending",
    };
    mockFetch(null, false, 500);

    await useTodosResult.createTodo(newTodo);

    expect(useTodosResult.loading.value).toBe(false);
    expect(useTodosResult.error.value).toBe("Failed to create todo");
  });

  it("updates a todo successfully", async () => {
    const existingTodo: Todo = {
      id: "1",
      title: "Existing Todo",
      description: "Existing Desc",
      status: "pending",
    };
    const updatedTodo: Todo = { ...existingTodo, title: "Updated Title" };

    mockFetch([existingTodo]); // Mock initial fetch
    await useTodosResult.fetchTodos();

    mockFetch(updatedTodo);
    await useTodosResult.updateTodo(existingTodo.id, {
      title: "Updated Title",
    });

    expect(useTodosResult.loading.value).toBe(false);
    expect(useTodosResult.error.value).toBeNull();
    expect(useTodosResult.todos.value[0].title).toBe("Updated Title");
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:4000/todos/${existingTodo.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Updated Title" }),
      },
    );
  });

  it("handles update todo error", async () => {
    const existingTodo: Todo = {
      id: "1",
      title: "Existing Todo",
      description: "Existing Desc",
      status: "pending",
    };

    mockFetch([existingTodo]); // Mock initial fetch
    await useTodosResult.fetchTodos();
    mockFetch(null, false, 500);

    await expect(
      useTodosResult.updateTodo(existingTodo.id, { title: "Updated Title" }),
    ).rejects.toThrowError("Failed to update todo");
    expect(useTodosResult.loading.value).toBe(false);
    expect(useTodosResult.error.value).toBe("Failed to update todo");
  });

  it("deletes a todo successfully", async () => {
    const initialTodos: Todo[] = [
      {
        id: "1",
        title: "Test Todo",
        description: "Test Desc",
        status: "pending",
      },
      {
        id: "2",
        title: "Test Todo 2",
        description: "Test Desc 2",
        status: "doing",
      },
    ];

    mockFetch(initialTodos);
    await useTodosResult.fetchTodos();

    mockFetch({});
    await useTodosResult.deleteTodo("1");

    expect(useTodosResult.loading.value).toBe(false);
    expect(useTodosResult.error.value).toBeNull();
    expect(useTodosResult.todos.value.length).toBe(1);
    expect(useTodosResult.todos.value).toEqual([initialTodos[1]]);
    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/todos/1", {
      method: "DELETE",
    });
  });

  it("handles delete todo error", async () => {
    const existingTodo: Todo = {
      id: "1",
      title: "Existing Todo",
      description: "Existing Desc",
      status: "pending",
    };

    mockFetch([existingTodo]);
    await useTodosResult.fetchTodos();

    mockFetch(null, false, 500);
    await useTodosResult.deleteTodo("1");

    expect(useTodosResult.loading.value).toBe(false);
    expect(useTodosResult.error.value).toBe("Failed to delete todo");
  });

  describe("handleTodoAction", () => {
    it("calls createTodo for create action", async () => {
      const newTodo = { title: "New", description: "Desc", status: "pending" };
      await useTodosResult.handleTodoAction({
        type: "create",
        payload: newTodo,
      });
      expect(useTodosResult.createTodo).toHaveBeenCalledWith(newTodo);
    });

    it("calls updateTodo for update action", async () => {
      const todoUpdate = { id: "1", title: "Updated" };
      await useTodosResult.handleTodoAction({
        type: "update",
        payload: todoUpdate,
      });
      expect(useTodosResult.updateTodo).toHaveBeenCalledWith(todoUpdate.id, {
        title: "Updated",
      });
    });

    it("calls deleteTodo for delete action", async () => {
      const todoToDelete = { id: "1" };
      await useTodosResult.handleTodoAction({
        type: "delete",
        payload: todoToDelete,
      });
      expect(useTodosResult.deleteTodo).toHaveBeenCalledWith(todoToDelete.id);
    });
  });
});
