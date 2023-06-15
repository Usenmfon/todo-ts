import { Types } from 'mongoose';

export class CreateTodoDTO {
  user?: Types.ObjectId;
  readonly title: string;
  readonly category: string;
  readonly completed: boolean;
}
