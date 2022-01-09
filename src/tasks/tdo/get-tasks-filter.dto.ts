import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDTO{
  @IsOptional()  //Nos permite que el ingreso de estos valores sean opcionales
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])  //este pipe revisa que el valor se encunetre dentro del array permitido
 status:TaskStatus;

 @IsOptional()
 @IsNotEmpty()
 search: string; 
}