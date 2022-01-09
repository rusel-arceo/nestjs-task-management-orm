import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; //para el typeOrm
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),  //Configuramos el typeorm con los valores que ya habiamos establecido.
    TasksModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
