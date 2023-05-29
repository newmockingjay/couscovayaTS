import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Discipline } from "./discipline.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Client } from "src/clients/client.entity";
import { Trainer } from "src/trainers/trainer.entity";
import { CreateDisciplineDto } from "./disciplines.dto/disciplineDTO";
import { IncompletedDisciplineDto } from "./disciplines.dto/incomplete-discipline.dto";

@Injectable()
export class DisciplinesService {
		constructor(
		@InjectRepository(Client)
		private readonly clientRepository: Repository<Client>, 
		@InjectRepository(Discipline)
		private readonly disciplineRepository: Repository<Discipline>, 
		@InjectRepository(Trainer)
		private readonly trainerRepository: Repository<Trainer>, 
	) {}
	
	async create(disciplineDto: CreateDisciplineDto): Promise<Discipline>{
		const discipline = this.disciplineRepository.create();
		discipline.name = disciplineDto.name;
		discipline.level = disciplineDto.level;
		const clients = await this.clientRepository.findBy({
			id: In(disciplineDto.clients)
		});
		discipline.clients = clients;
		const trainers = await this.trainerRepository.findBy({
			id: In(disciplineDto.trainers)
		});
		discipline.trainers = trainers;

		await this.disciplineRepository.save(discipline);
		return discipline;
	}

	async findAll(): Promise<Discipline[]>{
		const disciplines = await this.disciplineRepository.find({
			relations:{
				clients: true,
				trainers: true
			}
		});
		return disciplines;
	}

	findOne(id: number): Promise<Discipline>{
		return this.disciplineRepository.findOne({
			where: {id},
			relations: {
				clients: true,
				trainers: true
			}
		})
	}

	async findIncomplete(): Promise<IncompletedDisciplineDto[]>{
		const disciplines = await this.disciplineRepository.find();
		const incompletedDisciplines: IncompletedDisciplineDto[] = disciplines.map((discipline) => {
			const incompletedDiscipline = new IncompletedDisciplineDto();
			incompletedDiscipline.id = discipline.id;
			incompletedDiscipline.name = discipline.name;
			incompletedDiscipline.level = discipline.level;
			return incompletedDiscipline;
		});
		return incompletedDisciplines;
	}

	async update(id: number, updatedDiscipline: Discipline){
		const discipline = await this.disciplineRepository.findOne({where: {id}});
		discipline.name = updatedDiscipline.name;
		discipline.level = updatedDiscipline.level;
		discipline.clients = updatedDiscipline.clients;
		discipline.trainers = updatedDiscipline.trainers;
		await this.disciplineRepository.save(discipline);
		return discipline;
	}

	remove(id: number){
		this.disciplineRepository.delete({id});
	}



	/*constructor(private readonly datasourceService: DatasourceService) {}
	create (discipline: Discipline){
		this.datasourceService.getDisciplines().push(discipline);
		return discipline;
	}
	findOne(id: number){
		return this.datasourceService.getDisciplines().find((discipline) => discipline.id === id);
	}
	findAll(): Discipline[] {
		return this.datasourceService.getDisciplines();
	}
	update(id: number, updatedDiscipline: Discipline){
		const index = this.datasourceService.getDisciplines().findIndex((discipline) => discipline.id === id);
		this.datasourceService.getDisciplines()[index] = updatedDiscipline;
		return this.datasourceService.getDisciplines()[index];
	}
	remove(id: number){
		const index = this.datasourceService.getDisciplines().findIndex((discipline) => discipline.id === id);
		this.datasourceService.getDisciplines().splice(index, 1);
		return HttpStatus.OK;
	}*/
}
