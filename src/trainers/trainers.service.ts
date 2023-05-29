import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Trainer } from "./trainer.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from "typeorm";
import { Client } from "src/clients/client.entity";
import { Discipline } from "src/disciplines/discipline.entity";
import { CreateTrainerDto } from "./trainers.dto/trainerDTO";
import { IncompletedTrainerDto } from "./trainers.dto/incomplete-trainer.dto";
import { Group } from "src/groups/group.entity";

@Injectable()
export class TrainersService {
	constructor(
		@InjectRepository(Group)
		private readonly groupRepository: Repository<Group>, 
		@InjectRepository(Discipline)
		private readonly disciplineRepository: Repository<Discipline>, 
		@InjectRepository(Trainer)
		private readonly trainerRepository: Repository<Trainer>, 
	) {}
	
	async create(trainerDto: CreateTrainerDto): Promise<Trainer>{
		const trainer = this.trainerRepository.create();
		trainer.fullname = trainerDto.fullname;
		trainer.salary = trainerDto.salary;
		trainer.workhours = trainerDto.workhours;
		const disciplines = await this.disciplineRepository.findBy({
			id: In(trainerDto.disciplines)
		});
		trainer.disciplines = disciplines;
		const groups = await this.groupRepository.findBy({
			id: In(trainerDto.groups)
		});
		trainer.groups = groups;

		await this.trainerRepository.save(trainer);
		return trainer;
	}

	async findAll(): Promise<Trainer[]>{
		const trainers = await this.trainerRepository.find({
			relations:{
				disciplines: true
			}
		});
		return trainers;
	}

	findOne(id: number): Promise<Trainer>{
		return this.trainerRepository.findOne({
			where: {id},
			relations: {disciplines: true}
		})
	}

	async findIncomplete(): Promise<IncompletedTrainerDto[]>{
		const trainers = await this.trainerRepository.find();
		const incompletedTrainers: IncompletedTrainerDto[] = trainers.map((trainer) => {
			const incompletedTrainer = new IncompletedTrainerDto();
			incompletedTrainer.id = trainer.id;
			incompletedTrainer.fullname = trainer.fullname;
			incompletedTrainer.disciplines = trainer.disciplines;
			return incompletedTrainer;
		});
		return incompletedTrainers;
	}

	async update(id: number, updatedTrainer: Trainer){
		const trainer = await this.trainerRepository.findOne({where: {id}});
		trainer.fullname = updatedTrainer.fullname;
		trainer.workhours = updatedTrainer.workhours;
		trainer.salary = updatedTrainer.salary;
		trainer.disciplines = updatedTrainer.disciplines;
		trainer.groups = updatedTrainer.groups;
		await this.trainerRepository.save(trainer);
		return trainer;
	}

	remove(id: number){
		this.trainerRepository.delete({id});
	}


	/*constructor(private readonly datasourceService: DatasourceService) {}
	create (trainer: Trainer){
		this.datasourceService.getTrainers().push(trainer);
		return trainer;
	}
	findOne(id: number){
		return this.datasourceService.getTrainers().find((trainer) => trainer.id === id);
	}
	findAll(): Trainer[] {
		return this.datasourceService.getTrainers();
	}
	update(id: number, updatedTrainer: Trainer){
		const index = this.datasourceService.getTrainers().findIndex((trainer) => trainer.id === id);
		this.datasourceService.getTrainers()[index] = updatedTrainer;
		return this.datasourceService.getTrainers()[index];
	}
	remove(id: number){
		const index = this.datasourceService.getTrainers().findIndex((trainer) => trainer.id === id);
		this.datasourceService.getTrainers().splice(index, 1);
		return HttpStatus.OK;
	}
	clear(){
		// this.datasourceService.getTrainers().splice(0, Trainer.length);
		this.datasourceService.clearTrainers();
		return HttpStatus.OK;
	}*/
}
