import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken'
const secretKey = 'test_secret_key'
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  async registration(createUserDto: CreateUserDto): Promise<any> {

    let userFromDB = await this.userRepository.findOne({where: {email: createUserDto.email}})
    console.log(userFromDB)
    if(userFromDB) {
      return {error: 'Пользователь с такой почтой уже существует'}
    }
    console.log(createUserDto,'createUserDto REG')
    if(!createUserDto.role) {
      createUserDto.role = 'employee'
    }
    const token = jwt.sign({ data: createUserDto.email }, secretKey);
    let newUser = await this.userRepository.create({
      email: createUserDto.email, password: createUserDto.password, role: createUserDto.role, token
    })

    console.log(newUser, 'new user')
    // return {message: 'успешная регистрация', token: newUser.token}
    return await this.userRepository.save(newUser)
  }


  async login(createUserDto: CreateUserDto): Promise<any> {
    let userFromDB = await this.userRepository.findOne({where: {email: createUserDto.email, password: createUserDto.password}})
    console.log(userFromDB)
    if(!userFromDB) {
      return {error: 'Ошибка при вводе логина или пароля. Данные не корректы'}
    }

    return {message: 'успешный вход', token: userFromDB.token}
  }
    async findOne(email: string): Promise<User | undefined> {
      return await this.userRepository.findOne({where: {email}});
    }
    async updateToken(createUserDto: CreateUserDto): Promise<any> {
      const user = await this.userRepository.findOne({where: {email: createUserDto.email, password: createUserDto.password}});

      let editedUser = {...user, token: createUserDto.token}
      const Saveuser = await this.userRepository.save(editedUser);
      let result2
      if(Saveuser)  {
        const {password, ...result} = Saveuser
        result2 = result
      }

      return result2
    }
    async getToken(createUserDto: CreateUserDto): Promise<any> {
      console.log(createUserDto,'createUserDto')
      const user = await this.userRepository.findOne({where: {token: createUserDto.token}});
      let result2
      if(user)  {
        const {password, ...result} = user
        result2 = result
      }

      console.log(result2)
      return result2
    }

}
