/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import type { Todo as TodoType, TodoStatus } from '@repo/types';

export type TodoDocument = HydratedDocument<TodoType>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Todo implements Omit<TodoType, 'id'> {
  @Prop({
    type: Types.ObjectId,
    default: () => new Types.ObjectId(),
  })
  _id: Types.ObjectId;

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

  id: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

// map id with _id
TodoSchema.virtual('id').get(function () {
  return this._id.toString();
});

TodoSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
