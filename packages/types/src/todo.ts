export enum TodoStatus {
  PENDING = "pending",
  DOING = "doing",
  COMPLETED = "completed",
}

export type TodoBase = {
  title: string;
  description: string;
  status: TodoStatus;
};

export type Todo = TodoBase & {
  id: string;
};

export type CreateTodoPayload = TodoBase;

export type UpdateTodoPayload = {
  id: string;
} & Partial<TodoBase>;

export type DeleteTodoPayload = {
  id: string;
};

export const TodoActionEnum = {
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
} as const;

export type TodoActionType =
  (typeof TodoActionEnum)[keyof typeof TodoActionEnum];

export type TodoAction =
  | {
      type: typeof TodoActionEnum.CREATE;
      payload: CreateTodoPayload;
    }
  | {
      type: typeof TodoActionEnum.UPDATE;
      payload: UpdateTodoPayload;
    }
  | {
      type: typeof TodoActionEnum.DELETE;
      payload: DeleteTodoPayload;
    };
