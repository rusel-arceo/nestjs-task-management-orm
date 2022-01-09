import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
//Aqu´pi egragamos la validaciones usano el class-validator
export class AuthCredentialsDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;  
  
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  {message: 'password too week. Add some Uppercase, LowerCase, a number or special character'},
    ) //Aquí definimos una expresión regular que debe cumplir la contraseña
  // para que esta no sea debñil, fue proporcionada por el isntructor y se puede reutilizar. una mayuscula, minuscual y un carácter especial o número
  //Como segundo parametro opcional podemos personalizar el mensaje que manda el error para 
  password:string;
}