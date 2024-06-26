import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ],
  controllers: [UserController],
  providers: [UserService, CreateUserDto,  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
  exports: [UserService]
})
export class UserModule {}
