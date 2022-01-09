import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {    
  constructor(
    @InjectRepository(UserRepository) private userRepository:UserRepository, //inyectamos la dependecia para el repository
    private jwtService: JwtService,)  //inyectamoes en Jwt que ya se registrón en el authModule 
    {  }
  
  async signUp(authCredentialsDTO:AuthCredentialsDTO):Promise<void>
  {
    return this.userRepository.signUp(authCredentialsDTO);
  }

  async signIn(authCredentialsDTO:AuthCredentialsDTO):Promise<{accessToken:string}>  //definimos que regresará un objeto llamado accesToken tipo string
  {
    const username = await this.userRepository.validateUserPassword(authCredentialsDTO);  
    if(!username)
    {      
      throw new UnauthorizedException('Invalid credencials');  //si el password or user is incorrect, obtenemos null y mandamos el error
    }

    //Si es usuario es registrado, creamos el payload y el JWT
    const payload: JwtPayload = { username };  //JwtPayload es una interfase definidad para poder reutilizar el username del payload
    const accessToken = await this.jwtService.sign(payload);

    return {accessToken};
  }
}
