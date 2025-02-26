import { z } from "zod";

export const todoSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(50, { message: "Title must be at most 50 characters." }),
  description: z
    .string()
    .max(200, { message: "Description must be at most 200 characters." }),
  status: z.enum(["pending", "doing", "completed"]),
});

export type TodoSchemaType = z.infer<typeof todoSchema>;

export const todoEditSchema = todoSchema.omit({ id: true, status: true });

export type TodoEditSchemaType = z.infer<typeof todoEditSchema>;
