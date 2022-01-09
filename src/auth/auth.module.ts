import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret:'topSecret51',  //nuestra palabra clave
      signOptions:{
        expiresIn:3600,      //La expiración en milisegundos
      }
    }), // Se debe proporcionar una configuración    
    TypeOrmModule.forFeature([UserRepository]),  //aquí importamos todos los entities para el modulos, ya esta listo para inyectar
    //Hay que recordar que se debe inyectar en la clase de los service para su uso
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
