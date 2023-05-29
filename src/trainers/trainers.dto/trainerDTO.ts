import { Discipline } from "src/disciplines/discipline.entity";

export class CreateTrainerDto {
	fullname: string;
	workhours: number;
	salary: number;
	disciplines: number[];
	groups: number[]
}