import { ref } from "vue";
import { type TodoActionType, type Todo, type TodoAction } from "@repo/types";
import { useRuntimeConfig } from "#app";

export const useTodos = () => {
  const todos = ref<Todo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const fetchTodos = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${apiBaseUrl}/todos`);
      if (!response.ok) throw new Error("Failed to fetch todos");
      const data = await response.json();
      todos.value = data;
    } catch (e: any) {
      error.value = e.message || "Failed to fetch todos";
    } finally {
      loading.value = false;
    }
  };

  const createTodo = async (todo: Omit<Todo, "id">) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${apiBaseUrl}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) throw new Error("Failed to create todo");
      const newTodo = await response.json();
      todos.value.push(newTodo);
    } catch (e: any) {
      error.value = e.message || "Failed to create todo";
    } finally {
      loading.value = false;
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    loading.value = true;
    error.value = null;
    try {
      console.log("Updating todo:", { id, updates }); // Debug log
      const response = await fetch(`${apiBaseUrl}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Update failed:", errorData); // Debug log
        throw new Error(
          `Failed to update todo: ${errorData.message || response.statusText}`,
        );
      }

      const updatedTodo = await response.json();
      const index = todos.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        todos.value[index] = updatedTodo;
      }
    } catch (e: any) {
      console.error("Update error:", e); // Debug log
      error.value = e.message || "Failed to update todo";
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const deleteTodo = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${apiBaseUrl}/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete todo");
      todos.value = todos.value.filter((t) => t.id !== id);
    } catch (e: any) {
      error.value = e.message || "Failed to delete todo";
    } finally {
      loading.value = false;
    }
  };

  const handleTodoAction = async (action: TodoAction) => {
    switch (action.type) {
      case "create":
        await createTodo(action.payload);
        break;

      case "update":
        const { id, ...updates } = action.payload;
        await updateTodo(id, updates);
        break;

      case "delete":
        await deleteTodo(action.payload.id);
        break;
    }
  };

  return {
    todos,
    loading,
    error,
    fetchTodos,
    handleTodoAction,
  };
};
