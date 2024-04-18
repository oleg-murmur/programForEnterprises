import { Module } from '@nestjs/common';
import { InstrumentModule } from './instrument/instrument.module';
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

@Module({
  imports: [InstrumentModule,MeasuringDeviceModule, AuthModule, CommonModule,NestjsFormDataModule,
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
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'PFEnterprises',
      entities: [join(process.cwd(), 'dist/**/*.entity.js')],
      synchronize: true,
    })
  }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
