<template>
  <CardHeader>
    <div class="flex items-center justify-between w-full">
      <CardTitle>Todo Edition</CardTitle>
    </div>
  </CardHeader>
  <CardContent>
    <form class="w-full space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="title">
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder="To-Do Title" v-bind="componentField" />
          </FormControl>
          <FormDescription>Enter the title of your to-do item.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Tell us a little bit about yourself"
              class="resize-none"
              v-bind="componentField"
            />
          </FormControl>
          <FormDescription>
            Describe your to-do item in details but stay concise !
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <CardFooter class="w-full p-0 gap-2">
        <Button type="submit"> Submit </Button>
        <Button variant="ghost" @click="$emit('cancel')">Cancel</Button>
      </CardFooter>
    </form>
  </CardContent>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { todoEditSchema, type TodoEditSchemaType } from "~/lib/zod-schemas";
import { defineEmits } from "vue";
import type { Todo } from "@repo/types";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  (e: "submit", value: TodoEditSchemaType): void;
  (e: "cancel"): void;
}>();

const formSchema = toTypedSchema(todoEditSchema);

const { handleSubmit } = useForm<TodoEditSchemaType>({
  validationSchema: formSchema,
  initialValues: props.todo,
});

const onSubmit = handleSubmit((values) => {
  console.log("You submitted the following values:", values);
  emit("submit", values);
});
</script>
