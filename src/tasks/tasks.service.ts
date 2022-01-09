import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskDTO } from './tdo/create-task-dto';
import { GetTasksFilterDTO } from './tdo/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository )
  {  }

async getTasks(filterDTO:GetTasksFilterDTO):Promise<Task[]>{
    return this.taskRepository.getTasks(filterDTO);
  }

async getTaskById(id:number):Promise<Task>{   //En este caso retorna por ser async retorna una promesa del tipo Task
  const found = await this.taskRepository.findOne(id);

  if(!found)
  {
    throw new NotFoundException(`Task with ID "${id}" not found`);
    //equivaldria a selec * from task where id=${id} pero solo el primero porque sabemos que swon unicos
  }
  return found;
}

async createTask(createTaskDTO:CreateTaskDTO):Promise<Task>{
  //No tenemos que usar el repositorio o cualquier repositorio para crear, podemos utilizar simplemente las entitys 
  //pero es muy beneficionso usar el repositorios, se ejemplificará primnero usando el entity y luego el repositorio
 /*  const task = new Task();           //Todo esto se va al repository
  const { title, description } = createTaskDTO;
  
  task.title=title;
  task.description=description;
  task.status=TaskStatus.OPEN;

  await task.save(); //Recuerda que este task es una entidad (el modelo de la tabla)
  return task; */
  return this.taskRepository.createTask(createTaskDTO);
}

  async deleteTask(id:number):Promise<void> //aunque no retrona nada, como en async el void es tipo promesa, por eso va Promise<void>                                      
  {   
    //const found = this.getTasksById(id);  //Si no lo encuentra, dispara un error.
    const result = await this.taskRepository.delete(id);     
    
    if(result.affected===0) //afected devuelve el numero de lineas afectadas.
    {
      throw new NotFoundException(`Task with Id "${id}" not found`);
    }
  }

async updateTaskStatus(id:number, status:TaskStatus): Promise<Task>
{
  const task = await this.getTaskById(id);
  task.status = status;
  await task.save();
  return task;
}
}