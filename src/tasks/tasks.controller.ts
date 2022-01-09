import { Body, Controller, Get, Post, Query, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './tdo/create-task-dto';
import { GetTasksFilterDTO } from './tdo/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(public taskServices:TasksService){
  }

   @Get()
  // //@UsePipes(ValidationPipe) puede inscrustarse asi tambien
  getTask(@Query(ValidationPipe) filterDTO:GetTasksFilterDTO):Promise<Task[]> //Cambiamos de getAllTask a getTask ya que se van a meter filtros
  {
    return this.taskServices.getTasks(filterDTO); //Esto cambio de tener dos metodos, uno con filtros y otro sin ellos a un solo servicio que manejará los dos
  }

  @Post()  
  @UsePipes(ValidationPipe)
  //createTasks(@Body('title') title:string, @Body('description') description:string ): Task
  createTasks(@Body() createTaskDTO: CreateTaskDTO ):Promise<Task>
  {    
    return this.taskServices.createTask(createTaskDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id:number):Promise<Task>
  {
    return this.taskServices.getTaskById(id);
  }  

  @Patch('/:id/status')
  updateTask(@Param('id',ParseIntPipe) id:number, @Body('status',TaskStatusValidationPipe) status: TaskStatus):Promise<Task>
  {
    return this.taskServices.updateTaskStatus(id, status);
  }
  
  @Delete('/:id')
  deleteTask(@Param('id',ParseIntPipe) id:number):Promise<void>
  {
    return this.taskServices.deleteTask(id);
  }
} 


