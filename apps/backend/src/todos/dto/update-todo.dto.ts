/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { TodoStatus, type Todo } from '@repo/types';

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsString()
  id: Todo['id'];

  @IsNotEmpty()
  @IsString()
  title: Todo['title'];

  @IsString()
  description: Todo['description'];

  @IsEnum(TodoStatus)
  status: TodoStatus;
}
