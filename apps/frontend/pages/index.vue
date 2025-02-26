<template>
  <div class="flex flex-col items-center justify-center p-4 w-full">
    <h1>To-Do List</h1>
    <Button>Add Todo</Button>
    <div class="flex gap-2 items-center justify-center flex-wrap mt-4 w-full">
      <TodoCard
        v-for="todo in sortedTodos"
        :key="todo.id"
        :todo="todo"
        v-on:todo-change="handleTodoChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { type Todo, type TodoAction } from "@repo/types";
import { Button } from "~/components/ui/button";
import { updateTodo, createTodo, deleteTodo } from "@/composables/todo-utils";

const todos = ref<Todo[]>([
  {
    id: "1",
    title: "Learn Nuxt 3",
    description:
      "Learn Nuxt 3 and all its quirks and features, including routing and server-side rendering",
    status: "pending",
  },
  {
    id: "2",
    title: "Build a to-do list",
    description:
      "Build a to-do list that's both good-looking and functional, with a sleek design and intuitive user interface",
    status: "doing",
  },
  {
    id: "3",
    title: "Implement TodoCard component",
    description:
      "Implement TodoCard component so that it can be recycled through the app",
    status: "completed",
  },
  {
    id: "4",
    title: "Build a to-do list",
    description: "Build a to-do list before it's too late !",
    status: "doing",
  },
]);

const sortedTodos = computed(() => sortTodos(todos));

const handleTodoChange = (action: TodoAction) => {
  console.log("triggering todo change", action);
  switch (action.type) {
    case "update":
      updateTodo(todos, action);
      break;
    case "create":
      createTodo(todos, action);
      break;
    case "delete":
      deleteTodo(todos, action);
      break;
  }
};
</script>
