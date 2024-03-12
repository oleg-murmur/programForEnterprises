import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        // TypeOrmModule.forRoot({
        //   type: 'postgres',
        //   host: 'localhost',
        //   port: 5432,
        //   username: 'poll_user',
        //   password: 'poll_password',
        //   database: 'poll_db',
        //   entities: [],
        //   synchronize: true,
        // }),
      ],
})
export class DatabaseModule {}
