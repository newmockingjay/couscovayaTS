
import { Discipline } from 'src/disciplines/discipline.entity';
import { Group } from 'src/groups/group.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('trainers')
export class Trainer{
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	fullname: string;
	@Column()
	workhours: number;
	@Column()
	salary: number;

	@ManyToMany((type) => Discipline, (discipline) => discipline.trainers/*, {        
		cascade: true,
	}*/)
	@JoinTable({
		name: 'trainer_discipline',
		joinColumn: {name: 'trainer_id'}, 
		inverseJoinColumn: {name: 'discipline_id'}
	})
	disciplines: Discipline[];

	@ManyToMany(() => Group, (group) => group.trainers)
	@JoinTable({
    //join таблица 
		name: 'trainer_group',
		joinColumn: { name: 'trainer_id' }, 
		inverseJoinColumn: {name: 'group_id'}
  	})
	groups: Group[];
}