import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User) //Decimos que es un repositorio para en Entity User
export class UserRepository extends Repository<User>{ //debemos importarlo en el auth.module.ts
  
  async signUp(authCredentialsDTO: AuthCredentialsDTO):Promise<void>{
    const { username, password } = authCredentialsDTO;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try{
      await user.save();
    }catch(error)
    {
      console.log(error.code);
      if(error.code==='23505') //duplocate username
      {
        throw new ConflictException('Username already exist');
      }else{
        throw new InternalServerErrorException();
      }
    }
  }

 async validateUserPassword(authCredentialsDTO:AuthCredentialsDTO):Promise<string> {
  const { username, password } = authCredentialsDTO;
  const user = await this.findOne({username});
  if(user && await user.validatePassword(password)) //recuerda que comprueba el primero y si es false ya no se sigue, ojo con el wait, 
  //de lo contrario no espera la respuesta y lo pasa como true
  {
    return user.username;
  }else{
    return null;
  }
 }
 
  private async hashPassword(password: string, salt:string): Promise<string>
  {
    return bcrypt.hash(password,salt);
  }
}