import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { TodoStatus, type CreateTodoPayload } from '@repo/types';

export class CreateTodoDto implements CreateTodoPayload {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEnum(TodoStatus)
  status: TodoStatus;
}
