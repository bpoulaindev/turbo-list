export enum TodoStatus {
  PENDING = "pending",
  DOING = "doing",
  COMPLETED = "completed",
}

export type Todo = {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
};

export enum TodoActionType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export type TodoAction = {
  type: TodoActionType;
  payload?: Todo | Partial<Todo>;
};
