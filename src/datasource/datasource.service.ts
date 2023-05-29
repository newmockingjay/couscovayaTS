import { Injectable } from "@nestjs/common";
import { Discipline } from "src/disciplines/discipline.entity";
import { Trainer } from "src/trainers/trainer.entity";
import {Client} from "src/clients/client.entity"

@Injectable()
export class DatasourceService {
	private disciplines: Discipline[] = [];
	getDisciplines(): Discipline[] {
		return this.disciplines;
	}

	private trainers: Trainer[] = [];
	getTrainers(): Trainer[] {
		return this.trainers;
	}
	/*clearTrainers(): void {
		this.trainers = [];
	}*/

	private clients: Client[] = [];
	getClients(): Client[] {
		return this.clients;
	}
}
