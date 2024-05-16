
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken'
import { JwtService } from '@nestjs/jwt';
const secretKey = 'test_secret_key'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
) {}

  async signIn(createUserDto: CreateUserDto): Promise<{ access_token: string, result:any }> {
    const user = await this.usersService.findOne(createUserDto.email);
    if (user?.password !== createUserDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    // const { password, ...result } = user;

    const token = await this.jwtService.signAsync(payload);
    // const token = await jwt.sign({ data: createUserDto.email }, secretKey);

    // TODO: Generate a JWT and return it here
    // instead of the user object
    const result = await this.usersService.updateToken({password: user.password, email: user.email,token})
    return {
        access_token: token,
        result: result
      };
  }
}