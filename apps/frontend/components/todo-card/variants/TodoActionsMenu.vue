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
        v-if="props.status !== 'completed'"
        @click="emit('changeStatus', 'completed')"
      >
        <CheckCircle class="mr-2 h-4 w-4" />
        Mark as Complete
      </DropdownMenuItem>
      <DropdownMenuItem
        v-if="props.status !== 'pending'"
        @click="emit('changeStatus', 'pending')"
      >
        <CheckCircle class="mr-2 h-4 w-4" />
        Mark as pending
      </DropdownMenuItem>
      <DropdownMenuItem
        v-if="props.status !== 'doing'"
        @click="emit('changeStatus', 'doing')"
      >
        <CheckCircle class="mr-2 h-4 w-4" />
        Mark as Doing
      </DropdownMenuItem>
      <DropdownMenuItem @click="emit('delete')">
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
import type { Todo } from "@repo/types";

const props = defineProps<{
  status: Todo["status"];
}>();

const emit = defineEmits({
  edit: () => true,
  changeStatus: (status: Todo["status"]) => status,
  delete: () => true,
});
</script>
