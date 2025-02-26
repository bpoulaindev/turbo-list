import { ref } from "vue";
import { type Todo } from "@repo/types";
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
      const data = await $fetch<Todo[]>(`${apiBaseUrl}/todos`);
      todos.value = data;
    } catch (e: any) {
      error.value = e.message || "Failed to fetch todos";
    } finally {
      loading.value = false;
    }
  };
};
