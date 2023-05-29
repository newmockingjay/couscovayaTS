import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/clients/client.entity';
import { Discipline } from 'src/disciplines/discipline.entity';
import { Trainer } from 'src/trainers/trainer.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('groups')
export class Group{
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	groupname: string;


	@ManyToMany(() => Trainer, (trainer) => trainer.groups)
	@JoinTable({
    //join таблица 
		name: 'trainer_group',
		joinColumn: { name: 'group_id' }, 
		inverseJoinColumn: {name: 'trainer_id'}
  	})
	trainers: Trainer[];
	
	@ManyToMany(() => Client, (client) => client.groups)
	@JoinTable({
		name: 'client_group',
		joinColumn: {name: 'group_id'},
		inverseJoinColumn: {name: 'client_id'}
	})
	clients: Client[];
}