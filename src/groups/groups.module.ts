import { Module } from '@nestjs/common';
import { Group } from './group.entity';
import {  GroupsController } from './groups.controller';
import {GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from 'src/trainers/trainer.entity';
import { Client } from 'src/clients/client.entity';

@Module({
	controllers: [GroupsController],
	providers: [
		GroupsService,
	],
	imports: [
		TypeOrmModule.forFeature([Client, Trainer, Group])
	],
})

export class GroupsModule {}