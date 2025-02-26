/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type { Todo as TodoType, TodoStatus } from '@repo/types';

export type TodoDocument = HydratedDocument<TodoType>;

@Schema()
export class Todo implements TodoType {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
    enum: ['pending', 'doing', 'completed'],
    default: 'pending',
  })
  status: TodoStatus;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
