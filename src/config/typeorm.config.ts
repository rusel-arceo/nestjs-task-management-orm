//Esta configuación debe ser importada en el app.module
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host:'localhost',
  port:5432,
  username:'postgres',
  password:'admin123',
  database:'taskmanagement',
  entities:[__dirname + '/../**/*.entity{.ts,.js}'], //los entities son los modelos que pasara como tabla a la base de datos.
  //busca en todos los directorios, aquellos que terminen con .entity.ts
  synchronize: true,  //Muy importante, este es el syncronize que forza a crear las tablas, 
  //por los que si existen las borra y crea nuevamente pero perdiendo los datos. Deberíamos dejarlo en false.
};