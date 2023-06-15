import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserSchema } from 'src/shared/user.schema';

export const TodoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'UserSchema', require: true },
    title: String,
    category: { type: String, default: 'default' },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);
