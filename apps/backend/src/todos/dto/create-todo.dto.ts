/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import type { TodoStatus } from '@repo/types';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}
