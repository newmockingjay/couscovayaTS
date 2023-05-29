import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { Discipline } from './discipline.entity';
import { DisciplinesController } from './disciplines.controller';
import { DisciplinesService } from './disciplines.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/clients/client.entity';
import { Trainer } from 'src/trainers/trainer.entity';
import { DisciplinesDatasourceModule } from 'src/datasource/salesdatasource.module';

@Module({
	controllers: [DisciplinesController],
	providers: [DisciplinesService],
	imports: [
		DisciplinesDatasourceModule, 
		//DatasourceModule,
		TypeOrmModule.forFeature([Discipline, Client, Trainer])
	],
})

export class DisciplinesModule {}