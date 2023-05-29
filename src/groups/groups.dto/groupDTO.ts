import { ApiProperty } from "@nestjs/swagger";
import { Discipline } from "src/disciplines/discipline.entity";

export class CreateGroupDto {
	groupname: string;
	trainers: number[];
	clients: number[];
}