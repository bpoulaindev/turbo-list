<template>
  <div class="flex flex-col items-center justify-center p-4 w-full">
    <div class="flex justify-between items-center w-full max-w-120 mb-4">
      <h1 class="text-2xl font-bold">To-Do List</h1>
      <Button @click="showCreateForm = true" v-if="!showCreateForm">
        Add Todo
      </Button>
    </div>

    <CreateTodoCard
      v-if="showCreateForm"
      @todo-change="handleTodoChange"
      @cancel="showCreateForm = false"
      class="mb-4"
    />

    <div v-if="loading" class="mt-4">Loading...</div>
    <div v-else-if="error" class="mt-4 text-red-500">{{ error }}</div>
    <div
      v-else
      class="flex gap-2 items-center justify-center flex-wrap mt-4 w-full"
    >
      <TodoCard
        v-for="todo in sortedTodos"
        :key="todo.id"
        :todo="todo"
        @todo-change="handleTodoChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { type TodoAction } from "@repo/types";
import { Button } from "~/components/ui/button";
import { useTodos } from "~/composables/useTodos";
import { sortTodos } from "~/composables/todo-utils";
import CreateTodoCard from "~/components/todo-card/CreateTodoCard.vue";

const { todos, loading, error, fetchTodos, handleTodoAction } = useTodos();
const showCreateForm = ref(false);

const sortedTodos = computed(() => sortTodos(todos));

const handleTodoChange = async (action: TodoAction) => {
  await handleTodoAction(action);
  if (action.type === "create") {
    showCreateForm.value = false; // Hide form after successful creation
  }
};

onMounted(async () => {
  await fetchTodos();
});
</script>
