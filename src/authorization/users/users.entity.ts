import { ApiProperty } from "@nestjs/swagger";
// import { RoleEntity } from "src/roles/role.entity";
import { Role } from "../roles/role.enum";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class TheUser{
	@ApiProperty()
	@PrimaryGeneratedColumn()
	userId: number;

	@ApiProperty()
	@Column()
	username: string;

	@ApiProperty()
	@Column()
    password: string;
	
	@ApiProperty()
	/*@ManyToMany((type) => RoleEntity, (role) => role.users)
	@JoinTable({
		name: 'users_roles',
		joinColumn: {name: 'username'}, 
		inverseJoinColumn: {name: 'rolename'}
	})*/
	@Column()
	roles: Role;
}