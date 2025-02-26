/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { TodoStatus, type Todo } from '@repo/types';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: Todo['title'];

  @IsNotEmpty()
  @IsString()
  description: Todo['description'];

  @IsEnum(TodoStatus)
  status: TodoStatus;
}
