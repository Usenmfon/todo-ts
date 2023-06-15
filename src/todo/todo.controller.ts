import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthUser } from 'src/auth/decorators/auth.decorator';
import { IAuthUser } from 'src/interfaces/auth.interface';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  //add a todo
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addTodo(
    @GetAuthUser() user: IAuthUser,
    @Body() createTodoDTO: CreateTodoDTO,
  ) {
    return this.todoService.addTodo(user, createTodoDTO);
  }

  //get all todos
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllTodos(@GetAuthUser() user: IAuthUser): Promise<Todo[]> {
    return this.todoService.getAllTodo(user);
  }

  //get a todo by category
  @Get('/category/:cat')
  async getTodoByCategory(@Param('cat') cat): Promise<Todo[]> {
    return this.todoService.getTodoByCategory(cat);
  }

  //get a todo
  @Get(':id')
  async getTodoById(@Param('id') id): Promise<Todo> {
    return this.todoService.getTodoById(id);
  }

  // update a todo
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateTodo(
    @Param('id') id,
    @Body() createTodoDTO: CreateTodoDTO,
  ): Promise<Todo> {
    return this.todoService.updateTodo(id, createTodoDTO);
  }

  // delete a todo protected with JWT strategy
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteTodo(@Param('id') id): Promise<Todo> {
    return this.todoService.deleteTodo(id);
  }
}
