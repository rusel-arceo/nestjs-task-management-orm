import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService:AuthService){}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDTO:AuthCredentialsDTO): Promise<void> 
  //recuerda que el validationPipe se puede poner arriba del metodo para aplicarlo a todos
  {    
    return this.authService.signUp(authCredentialsDTO);
  }

  
  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDTO:AuthCredentialsDTO): Promise< { accessToken:string }> 
  //recuerda que el validationPipe se puede poner arriba del metodo para aplicarlo a todos
  {
    console.log(authCredentialsDTO);
    return this.authService.signIn(authCredentialsDTO);
  }
}
