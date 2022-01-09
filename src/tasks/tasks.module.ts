import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports:[TypeOrmModule.forFeature([TaskRepository])], //con esta inyección al modulo, ya lo podemos usar en el service
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
