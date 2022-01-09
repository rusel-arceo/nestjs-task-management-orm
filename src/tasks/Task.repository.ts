import { EntityRepository,Repository}from'typeorm';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { CreateTaskDTO } from './tdo/create-task-dto';
import { GetTasksFilterDTO } from './tdo/get-tasks-filter.dto';

@EntityRepository(Task) //Le pasamos en entity, del cual este será el repositorio
export class TaskRepository extends Repository<Task> { //El <Task> esta definiendo el tipo de datos del repositorio, es como que hagas un nombre: string[] que sería igual a array<string>. Esto lo usamos para definir el entity que se usa.
//Y lo insertamos en el tasks.module.ts, el entity lo habíamos insertado en el app.module.ts.

//Repository para obtener todas las tareas con o sin filtro
async getTasks(filterDTO:GetTasksFilterDTO): Promise<Task[]>
{
  const { status, search }=filterDTO;
  const query = this.createQueryBuilder('task'); //Creamos el querybuilder que viene de repository, le pasamos task com parabra clave que refiere al entity y que se usará mas adelante
  // const result = query.getMany();  SI hacemos esto directmente, retorna todas las tareas
  // return result;
  if(status){
    query.andWhere('task.status= :status', {status});//basicamente nos permite hacer las consultas where,
            //se puede hacer solo .Where pero se sobreescribirian y como quiero que trabajen juntos por eso se usa andWhere
            //Para 'task.status= :status' ---> : status es una variable y el valor es , {status} que significa {status:status}, podria ser por ejemplo {status:'OPEN'}
  }

  if(search)
  {
    query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search:`%${search}%`}); //LIKE y no = porque permite una correspondencia parcial, los parentesis no dentro '' podrian omitirse
    //y search:`%${search}%` permite que por ejemplo si el titulo es nestjs con solo nest debe hacer la correspondencía
    //tambien existe orWhere que plaica uno u otro
  }

  const result = query.getMany();
  return result;
}

async createTask(createTaskDTO:CreateTaskDTO):Promise<Task>  //El repositorio nos permite acceder directamente a los metodos pero tambien de la base de datos pero tambien crear metodos personalizados.
{
  const { title, description } = createTaskDTO;
  const task = new Task();
  
  task.title=title;
  task.description=description;
  task.status=TaskStatus.OPEN;

  await task.save(); //Recuerda que este task es una entidad (el modelo de la tabla)
  return task;
}
}