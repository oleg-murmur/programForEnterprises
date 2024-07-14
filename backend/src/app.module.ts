import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MeasuringDeviceModule } from './measuring-device/measuring-device.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { MutexServiceModule } from './mutex-service/mutex-service.module';

@Module({
  imports: [MeasuringDeviceModule, AuthModule, CommonModule,NestjsFormDataModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configSrvice: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: '12345',
        database: 'instDBDB',
      entities: [join(process.cwd(), 'dist/**/*.entity.js')],
      synchronize: true,
    })
  }),
    UserModule,
    FileModule,
    MutexServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
