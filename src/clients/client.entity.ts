import { ApiProperty } from '@nestjs/swagger';
import { Discipline } from 'src/disciplines/discipline.entity';
import { Group } from 'src/groups/group.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('clients')
export class Client{
	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@PrimaryGeneratedColumn()
	id: number;
	@ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО' })
	@Column()
	fullname: string;
	@ApiProperty({ example: 'мужчина', description: 'гендер' })
	@Column()
	gendre: string;
	@ApiProperty({ example: '15.04.2004', description: 'дата рождения' })
	@Column()
	birthday: string;
	
	@ManyToMany(() => Discipline, (discipline) => discipline.clients/*, {        
		cascade: true,
	}*/)
	@JoinTable({
		name: 'client_discipline',
		joinColumn: {name: 'client_id'},
		inverseJoinColumn: {name: 'discipline_id'}
	})
	disciplines: Discipline[];

	@ManyToMany(() => Group, (group) => group.clients)
	@JoinTable({
		name: 'client_group',
		joinColumn: {name: 'client_id'},
		inverseJoinColumn: {name: 'group_id'}
	})
	groups: Group[];
}