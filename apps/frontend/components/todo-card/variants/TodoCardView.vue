<template>
  <Card
    :class="
      cn(props.todo.status === 'completed' && 'opacity-30', 'w-full max-w-120')
    "
  >
    <CardHeader>
      <div class="flex items-center justify-between w-full">
        <div class="flex flex-row items-center w-full gap-4">
          <CardTitle>{{ props.todo.title }}</CardTitle>
          <Badge
            :variant="props.todo.status === 'doing' ? 'default' : 'secondary'"
            >{{ statusLabel }}</Badge
          >
        </div>
        <TodoActionsMenu
          :status="props.todo.status"
          @edit="handleEdit"
          @changeStatus="handleStatusChange"
          @delete="deleteTodo"
        />
      </div>
      <CardDescription>{{ props.todo.description }}</CardDescription>
    </CardHeader>
    <CardFooter class="flex justify-end gap-2" />
  </Card>
</template>

<script setup lang="ts">
import type { Todo, TodoAction } from "@repo/types";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import TodoActionsMenu from "./TodoActionsMenu.vue";
import { handler } from "tailwindcss-animate";
const props = defineProps<{
  todo: Todo;
  onTodoChange: (action: TodoAction) => void;
}>();

const emit = defineEmits<{
  (e: "enterEdit"): void;
}>();

const deleteTodo = () => {
  props.onTodoChange({
    type: "delete",
    payload: { id: props.todo.id },
  });
};

const handleStatusChange = (status: Todo["status"]) => {
  props.onTodoChange({
    type: "update",
    payload: { id: props.todo.id, status: status },
  });
};

const statusLabel = computed(() => {
  switch (props.todo.status) {
    case "pending":
      return "Not started yet";
    case "doing":
      return "Doing";
    case "completed":
      return "Completed";
    default:
      return "Unknown";
  }
});

const handleEdit = () => {
  emit("enterEdit");
};
</script>
