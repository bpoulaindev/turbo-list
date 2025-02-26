<template>
  <Card
    :class="
      cn(props.todo.status === 'completed' && 'bg-grey-50', 'w-full max-w-120')
    "
  >
    <TodoCardView
      v-if="!isEditing"
      :todo="props.todo"
      v-on:todo-change="props.onTodoChange"
      @enterEdit="isEditing = true"
    />
    <TodoForm
      v-else
      :todo="props.todo"
      @submit="handleSave"
      @cancel="isEditing = false"
    />
  </Card>
</template>

<script setup lang="ts">
import type { Todo, TodoAction } from "@repo/types";
import { cn } from "~/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import TodoActionsMenu from "./variants/TodoActionsMenu.vue";
import { ref } from "vue";
import TodoForm from "./variants/TodoForm.vue"; // Import TodoForm
import {
  type TodoSchemaType,
  type TodoEditSchemaType,
} from "~/lib/zod-schemas";
import TodoCardView from "./variants/TodoCardView.vue";

const props = defineProps<{
  todo: Todo;
  onTodoChange: (action: TodoAction) => void;
}>();

const isEditing = ref(false);

const handleSave = (editedTodo: TodoEditSchemaType) => {
  console.log("handleSave called with:", editedTodo);
  props.onTodoChange({
    type: "update",
    payload: { id: props.todo.id, ...editedTodo },
  });
  isEditing.value = false;
};
</script>
