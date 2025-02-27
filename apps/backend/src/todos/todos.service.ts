import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Error as MongooseError } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const createdTodo = await this.todoModel.create(createTodoDto);
      return createdTodo.toJSON() as Todo;
    } catch (error) {
      if (error instanceof MongooseError.CastError) {
        throw new BadRequestException('Invalid Todo data format');
      }
      console.error('Error creating todo:', error);
      throw new InternalServerErrorException('Failed to create Todo');
    }
  }

  async findAll(): Promise<Todo[]> {
    const todos = await this.todoModel.find().exec();
    return todos.map((todo) => todo.toJSON() as Todo);
  }

  async findOne(id: string): Promise<Todo> {
    try {
      const objectId = new Types.ObjectId(id);
      const todo = await this.todoModel.findById(objectId).exec();

      if (!todo) {
        throw new NotFoundException(`Todo with ID "${id}" not found`);
      }
      return todo.toJSON() as Todo;
    } catch (error) {
      if (error instanceof MongooseError.CastError) {
        throw new BadRequestException('Invalid Todo ID format');
      }
      console.error('Error finding todo:', error);
      throw new InternalServerErrorException('Failed to find Todo');
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      const objectId = new Types.ObjectId(id);
      const updatedTodo = await this.todoModel
        .findByIdAndUpdate(objectId, updateTodoDto, { new: true })
        .exec();
      if (!updatedTodo) {
        throw new NotFoundException(`Todo with ID "${id}" not found`);
      }
      return updatedTodo;
    } catch (error) {
      if (error instanceof MongooseError.CastError) {
        throw new BadRequestException('Invalid Todo ID format');
      }
      console.error('Error updating todo:', error); // Enhanced logging
      throw new InternalServerErrorException('Failed to update Todo');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const objectId = new Types.ObjectId(id);
      const result = await this.todoModel.findByIdAndDelete(objectId).exec();
      if (!result) {
        throw new NotFoundException(`Todo with ID "${id}" not found`);
      }
    } catch (error) {
      if (error instanceof MongooseError.CastError) {
        throw new BadRequestException('Invalid Todo ID format');
      }
      throw new InternalServerErrorException('Failed to delete Todo');
    }
  }
}
