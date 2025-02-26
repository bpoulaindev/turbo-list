/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type { Todo as TodoType, TodoStatus } from '@repo/types';

export type TodoDocument = HydratedDocument<TodoType>;

@Schema()
export class Todo implements TodoType {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    type: String,
    enum: ['pending', 'doing', 'completed'],
    default: 'pending',
  })
  status: TodoStatus;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

// map id with _id
TodoSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

TodoSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
