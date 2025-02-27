<template>
  <Card class="w-full max-w-120">
    <CardHeader>
      <CardTitle>Create New Todo</CardTitle>
    </CardHeader>
    <TodoForm
      :todo="{
        title: '',
        description: '',
        status: 'pending' as TodoStatus,
      }"
      @submit="handleSubmit"
      @cancel="$emit('cancel')"
    />
  </Card>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle } from "../ui/card";
import TodoForm from "./variants/TodoForm.vue";
import { type TodoStatus, type TodoAction } from "@repo/types";
import { useTodoActions } from "~/composables/useTodoActions";
import type { TodoEditSchemaType } from "~/lib/zod-schemas";

const emit = defineEmits<{
  (e: "todo-change", action: TodoAction): void;
  (e: "cancel"): void;
}>();

const { handleCreate } = useTodoActions();

const handleSubmit = (formData: TodoEditSchemaType) => {
  const action = handleCreate({
    ...formData,
    status: "pending" as TodoStatus,
  });
  emit("todo-change", action);
};
</script>
