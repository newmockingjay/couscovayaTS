import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Client } from "./client.entity";
import { Discipline } from "src/disciplines/discipline.entity";
import { Trainer } from "src/trainers/trainer.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from "typeorm";
import { CreateClientDto } from "./clients.dto/clientDTO";
import { IncompletedClientDto } from "./clients.dto/incomplete-client.dto";
import { group } from "console";
import { Group } from "src/groups/group.entity";


@Injectable()
export class ClientsService {
	constructor(
		@InjectRepository(Client)
		private readonly clientRepository: Repository<Client>, 
		@InjectRepository(Discipline)
		private readonly disciplineRepository: Repository<Discipline>, 
		@InjectRepository(Group)
		private readonly groupRepository: Repository<Group>,
	) {}
	
	async create(clientDto: CreateClientDto): Promise<Client>{
		const client = this.clientRepository.create();
		client.fullname = clientDto.fullname;
		client.birthday = clientDto.birthday;
		client.gendre = clientDto.gendre;
		const disciplines = await this.disciplineRepository.findBy({
			id: In(clientDto.disciplines)
		});
		client.disciplines = disciplines;
		const groups = await this.groupRepository.findBy({
			id: In(clientDto.groups)
		});
		client.groups = groups;

		await this.clientRepository.save(client);
		return client;
	}

	async findAll(): Promise<Client[]>{
		const clients = await this.clientRepository.find({
			relations:{
				disciplines: true
			}
		});
		return clients;
	}

	findOne(id: number): Promise<Client>{
		return this.clientRepository.findOne({
			where: {id},
			relations: {disciplines: true}
		})
	}

	/*async findIncomplete(): Promise<IncompletedClientDto[]>{
		const clients = await this.clientRepository.find();
		const incompletedCliens: IncompletedClientDto[] = clients.map((client) => {
			const incompletedClient = new IncompletedClientDto();
			incompletedClient.id = client.id;
			incompletedClient.fullname = client.fullname;
			return incompletedClient;
		});
		return incompletedCliens;
	}*/

	async findIncomplete(): Promise<IncompletedClientDto[]> {
		const clients = await this.clientRepository.find(
		{
			relations: {
				disciplines: true
			},
		}
		);
		const incompletedClients: IncompletedClientDto[] = clients.map((client) => {
			const incompletedClient = new IncompletedClientDto();
			incompletedClient.id = client.id;
			incompletedClient.fullname = client.fullname;
			return incompletedClient;
		});
		return incompletedClients;
	}	

	async update(id: number, updatedClient: Client){
		const client = await this.clientRepository.findOne({where: {id}});
		client.fullname = updatedClient.fullname;
		client.birthday = updatedClient.birthday;
		client.gendre = updatedClient.gendre;
		client.disciplines = updatedClient.disciplines;
		client.groups = updatedClient.groups;
		await this.clientRepository.save(client);
		return client;
	}

	remove(id: number){
		this.clientRepository.delete({id});
	}

}
