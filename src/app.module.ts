import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { TodoModule } from './todo/todo.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/todo-app', {
      connectionFactory: (connection: Connection) => {
        return connection;
      },
    }),
    SharedModule,
    AuthModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
