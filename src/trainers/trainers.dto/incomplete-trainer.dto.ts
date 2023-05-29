import { Discipline } from "src/disciplines/discipline.entity";

export class IncompletedTrainerDto{
	id: number;
	fullname: string;
	disciplines: Discipline[
		
	]
}