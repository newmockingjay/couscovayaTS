import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { DatasourceModule } from './datasource/datasource.module';
import {DisciplinesModule} from './disciplines/disciplines.module';
import { TrainersModule } from './trainers/trainers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import "reflect-metadata";
import { UsersModule } from './authorization/users/users.module';
import { AuthModule } from './authorization/auth/auth.module';
import { JwtAuthGuard } from './authorization/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './authorization/local/local-auth.guard';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    DatasourceModule,
    // ClientsDatasourceModule, 
    // TrainersDatasourceModule, 
    // DisciplinesDatasourceModule,
    DisciplinesModule, 
    TrainersModule, 
    ClientsModule,
    GroupsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432, 
      database: 'education',
      username: 'postgres', 
      password: '158821Xy', 
      host: 'localhost',
      synchronize: false, //отключаем автосинхронизацию
      logging: 'all', 
      //entities: [Client, Discipline, Trainer]
      entities: ['dist/**/*.entity{.ts,.js}'] //путь к сущностямn
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    JwtAuthGuard, 
		LocalAuthGuard,
  ],
})

export class AppModule {}

