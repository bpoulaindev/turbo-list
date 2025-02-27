import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Todo } from './schemas/todo.schema';
import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from '@repo/types';

const mockTodo = (
  id?: string,
  title?: string,
  description?: string,
  status?: TodoStatus,
): Todo => {
  const todoId: string =
    id !== undefined ? id : new Types.ObjectId().toHexString();
  const todoTitle: string = title !== undefined ? title : 'Test Todo';
  const todoDescription: string =
    description !== undefined ? description : 'Test Description';
  const todoStatus: TodoStatus =
    status !== undefined ? status : TodoStatus.PENDING;

  return {
    _id: todoId,
    title: todoTitle,
    description: todoDescription,
    status: todoStatus,
    toJSON: () => ({
      id: todoId,
      title: todoTitle,
      description: todoDescription,
      status: todoStatus,
    }),
  } as unknown as Todo;
};

const mockTodoModel = () => ({
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  exec: jest.fn(),
  save: jest.fn(),
  lean: jest.fn(),
  toJSON: jest.fn().mockImplementation((value) => value),
});

type MockModel = ReturnType<typeof mockTodoModel>;

describe('TodosService', () => {
  let service: TodosService;
  let model: MockModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getModelToken(Todo.name),
          useFactory: mockTodoModel,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    model = module.get(getModelToken(Todo.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'New Todo',
        description: 'New Description',
        status: TodoStatus.DOING,
      };
      const createdTodo = mockTodo();
      jest.spyOn(model, 'create').mockResolvedValueOnce(createdTodo);
      jest.spyOn(model, 'save').mockResolvedValueOnce(createdTodo);

      const result = await service.create(createTodoDto);
      expect(model.create).toHaveBeenCalledWith(createTodoDto);
      expect(model.save).toHaveBeenCalled();
      expect(result).toEqual(createdTodo);
    });

    it('should throw InternalServerErrorException on create failure', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'New Todo',
        description: 'New Description',
        status: TodoStatus.PENDING,
      };
      jest
        .spyOn(model, 'create')
        .mockRejectedValueOnce(new Error('Simulated create error'));

      await expect(service.create(createTodoDto)).rejects.toThrowError(
        InternalServerErrorException,
      ); // Expect InternalServerErrorException
    });
  });

  describe('findAll', () => {
    it('should return all todos', async () => {
      const todosArray = [mockTodo(), mockTodo('2', 'Second Todo')];
      jest.spyOn(model, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(todosArray),
      } as any);

      const result = await service.findAll();
      expect(model.find).toHaveBeenCalled();
      expect(result).toEqual(todosArray);
    });

    it('should throw InternalServerErrorException on findAll failure', async () => {
      jest.spyOn(model, 'find').mockReturnValueOnce({
        exec: jest
          .fn()
          .mockRejectedValueOnce(new Error('Simulated find error')),
      } as any);

      await expect(service.findAll()).rejects.toThrowError(
        InternalServerErrorException,
      ); // Expect InternalServerErrorException
    });
  });

  describe('findOne', () => {
    it('should return a todo by id', async () => {
      const todo = mockTodo();
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(todo),
      } as any);

      const result = await service.findOne(todo.id);
      expect(model.findById).toHaveBeenCalledWith(new Types.ObjectId(todo.id));
      expect(result).toEqual(todo);
    });

    it('should throw NotFoundException if todo not found', async () => {
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(
        service.findOne(new Types.ObjectId().toHexString()),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for invalid ObjectId', async () => {
      await expect(service.findOne('invalid-object-id')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw InternalServerErrorException on findOne failure', async () => {
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        exec: jest
          .fn()
          .mockRejectedValueOnce(new Error('Simulated findById error')),
      } as any);

      await expect(
        service.findOne(new Types.ObjectId().toHexString()),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const todo = mockTodo();
      const updateTodoDto: UpdateTodoDto = { title: 'Updated Title' };
      const updatedTodo = mockTodo(todo.id, 'Updated Title');
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(updatedTodo),
      } as any);

      const result = await service.update(todo.id, updateTodoDto);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        new Types.ObjectId(todo.id),
        updateTodoDto,
        { new: true },
      );
      expect(result).toEqual(updatedTodo);
    });

    it('should throw NotFoundException if todo not found for update', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(
        service.update(new Types.ObjectId().toHexString(), { title: 'Update' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for invalid ObjectId on update', async () => {
      await expect(
        service.update('invalid-object-id', { title: 'Update' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on update failure', async () => {
      const todo = mockTodo();
      const updateTodoDto: UpdateTodoDto = { title: 'Updated Title' };
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
        exec: jest
          .fn()
          .mockRejectedValueOnce(
            new Error('Simulated findByIdAndUpdate error'),
          ),
      } as any);

      await expect(service.update(todo.id, updateTodoDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      const todo = mockTodo();
      jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce({ deletedCount: 1 }),
      } as any);

      await service.remove(todo.id);
      expect(model.findByIdAndDelete).toHaveBeenCalledWith(
        new Types.ObjectId(todo.id),
      );
    });

    it('should throw NotFoundException if todo not found for delete', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce({ deletedCount: 0 }),
      } as any);

      await expect(
        service.remove(new Types.ObjectId().toHexString()),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for invalid ObjectId on remove', async () => {
      await expect(service.remove('invalid-object-id')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw InternalServerErrorException on remove failure', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce({
        exec: jest
          .fn()
          .mockRejectedValueOnce(
            new Error('Simulated findByIdAndDelete error'),
          ),
      } as any);

      await expect(
        service.remove(new Types.ObjectId().toHexString()),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
