import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo } from './interfaces/todo.interface';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  // Get all todos
  async getAllTodo(user): Promise<Todo[]> {
    return this.todoModel.find({ user: user._id }).exec();
  }

  // Get a todo by category
  async getTodoByCategory(cat: string): Promise<Todo[]> {
    const todo = await this.todoModel.find({ category: cat }).exec();
    return todo;
  }

  // Get a todo
  async getTodoById(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();
    return todo;
  }

  // Add a todo
  async addTodo(user, createTodoDTO: CreateTodoDTO): Promise<Todo> {
    createTodoDTO.user = user._id;
    const newTodo = await new this.todoModel(createTodoDTO);
    return newTodo.save();
  }

  // Update a todo
  async updateTodo(id: string, createTodoDTO: CreateTodoDTO): Promise<Todo> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(
      id,
      createTodoDTO,
      { new: true },
    );
    return updatedTodo;
  }

  // Delete a todo
  async deleteTodo(id: string): Promise<any> {
    const deletedTodo = await this.todoModel.findByIdAndRemove(id);
    return deletedTodo;
  }
}
