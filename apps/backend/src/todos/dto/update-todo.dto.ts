import { IsString, IsEnum } from 'class-validator';
import { TodoStatus, type UpdateTodoPayload } from '@repo/types';

export class UpdateTodoDto implements Partial<UpdateTodoPayload> {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsEnum(TodoStatus)
  status?: TodoStatus;
}
