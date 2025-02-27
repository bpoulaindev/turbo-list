<template>
  <DropdownMenu>
    <DropdownMenuTrigger :as-child="true">
      <Button variant="outline"> Actions </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="emit('edit')">
        <Edit class="mr-2 h-4 w-4" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem
        v-if="props.todo.status !== 'completed'"
        @click="handleStatusUpdate('completed' as TodoStatus)"
      >
        <CheckCircle class="mr-2 h-4 w-4" />
        Mark as complete
      </DropdownMenuItem>
      <DropdownMenuItem
        v-if="props.todo.status !== 'pending'"
        @click="handleStatusUpdate('pending' as TodoStatus)"
      >
        <CheckCircle class="mr-2 h-4 w-4" />
        Mark as pending
      </DropdownMenuItem>
      <DropdownMenuItem
        v-if="props.todo.status !== 'doing'"
        @click="handleStatusUpdate('doing' as TodoStatus)"
      >
        <CheckCircle class="mr-2 h-4 w-4" />
        Mark as doing
      </DropdownMenuItem>
      <DropdownMenuItem @click="handleDeleteClick">
        <Trash2 class="mr-2 h-4 w-4" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { Edit, Trash2, CheckCircle } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { TodoStatus, Todo, TodoAction } from "@repo/types";

const props = defineProps<{
  todo: Todo;
  onTodoChange: (todo: TodoAction) => void;
}>();

const emit = defineEmits<{
  (e: "edit"): void;
}>();

const { handleStatusChange, handleDelete } = useTodoActions();

const handleStatusUpdate = (newStatus: TodoStatus) => {
  const action = handleStatusChange(props.todo, newStatus);
  props.onTodoChange(action);
};

const handleDeleteClick = () => {
  const action = handleDelete(props.todo);
  props.onTodoChange(action);
};
</script>
