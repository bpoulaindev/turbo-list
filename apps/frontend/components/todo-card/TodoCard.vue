<template>
  <Card
    :class="
      cn(props.todo.status === 'completed' && 'bg-grey-50', 'w-full max-w-120')
    "
  >
    <TodoCardView
      v-if="!isEditing"
      :todo="props.todo"
      :on-todo-change="props.onTodoChange"
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
import { type Todo, type TodoAction } from "@repo/types";
import { cn } from "~/lib/utils";
import { Card } from "../ui/card";
import { ref } from "vue";
import TodoForm from "./variants/TodoForm.vue";
import { type TodoEditSchemaType } from "~/lib/zod-schemas";
import TodoCardView from "./variants/TodoCardView.vue";

const props = defineProps<{
  todo: Todo;
  onTodoChange: (action: TodoAction) => void;
}>();

const isEditing = ref(false);

const handleSave = (editedTodo: TodoEditSchemaType) => {
  props.onTodoChange({
    type: "update",
    payload: {
      id: props.todo.id,
      ...editedTodo,
    },
  });
  isEditing.value = false;
};
</script>
