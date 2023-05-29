import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Group } from "./group.entity";

import { Trainer } from "src/trainers/trainer.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from "typeorm";

import { CreateGroupDto } from "./groups.dto/groupDTO";
import { Client } from "src/clients/client.entity";


@Injectable()
export class GroupsService {
	constructor(
		@InjectRepository(Group)
		private readonly groupRepository: Repository<Group>, 
		@InjectRepository(Client)
		private readonly clientRepository: Repository<Client>, 
		@InjectRepository(Trainer)
		private readonly trainerRepository: Repository<Trainer>, 
	) {}
	
	async create(groupDto: CreateGroupDto): Promise<Group>{
		const group = this.groupRepository.create();
		group.groupname = groupDto.groupname;
		const trainers = await this.trainerRepository.findBy({
			id: In(groupDto.trainers),
		});
		group.trainers = trainers;
		const clients = await this.clientRepository.findBy({
			id: In(groupDto.clients)
		});
		group.clients = clients;

		await this.clientRepository.save(group);
		return group;
	}

	async findAll(): Promise<Group[]>{
		const groups = await this.groupRepository.find({
			relations:{
				clients: true,
				trainers: true
			}
		});
		return groups;
	}

	findOne(id: number): Promise<Group>{
		return this.groupRepository.findOne({
			where: {id},
			relations: {				
				clients: true,
				trainers: true
			}
		})
	}

	async update(id: number, updatedGroup: Group){
		const group = await this.groupRepository.findOne({where: {id}});
		group.id = updatedGroup.id;
		group.groupname = updatedGroup.groupname;
		group.clients = updatedGroup.clients;
		group.trainers = updatedGroup.trainers;
		await this.groupRepository.save(group);
		return group;
	}

	remove(id: number){
		this.groupRepository.delete({id});
	}
}
