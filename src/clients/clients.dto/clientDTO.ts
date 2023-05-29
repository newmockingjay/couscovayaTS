import { ApiProperty } from "@nestjs/swagger";
import { Discipline } from "src/disciplines/discipline.entity";

export class CreateClientDto {
	@ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО' })
	fullname: string;
	@ApiProperty({ example: 'мужчина', description: 'гендер' })
	gendre: string;
	@ApiProperty({ example: '15.04.2004', description: 'дата рождения' })
	birthday: string;
	@ApiProperty()
	disciplines: number[];
	@ApiProperty()
	groups: number[]
}