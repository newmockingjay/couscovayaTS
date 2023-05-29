import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { Trainer } from './trainer.entity';
import { TrainersController } from './trainers.controller';
import { TrainersService } from './trainers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discipline } from 'src/disciplines/discipline.entity';
import { TrainersDatasourceModule } from 'src/datasource/countriesdatasource.module';
import { Group } from 'src/groups/group.entity';

@Module({
	controllers: [TrainersController],
	providers: [TrainersService],
	imports: [
		TrainersDatasourceModule, 
		//DatasourceModule,
		TypeOrmModule.forFeature([Trainer, Discipline, Group])	
	],
})

export class TrainersModule {}