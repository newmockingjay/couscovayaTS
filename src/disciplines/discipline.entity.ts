
import { Client } from 'src/clients/client.entity';
import { Trainer } from 'src/trainers/trainer.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('disciplines')
export class Discipline{
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	name: string;
	@Column()
	level: string;

	@ManyToMany(() => Client, (client) => client.disciplines/*, {        
		cascade: true,
	}*/)
	@JoinTable({
		name: 'client_discipline',
		joinColumn: {name: 'discipline_id'},
		inverseJoinColumn: {name: 'client_id'}
	})
	clients: Client[];

	@ManyToMany(() => Trainer, (trainer) => trainer.disciplines/*, {        
		cascade: true,
	}*/)
	@JoinTable({
		name: 'trainer_discipline',
		joinColumn: {name: 'discipline_id'}, 
		inverseJoinColumn: {name: 'trainer_id'}
	})
	trainers: Trainer[];
}