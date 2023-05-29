import { Controller, Get, Param, Put, Body, Post, Delete, UseGuards } from "@nestjs/common";
import { Trainer } from "./trainer.entity";
import { TrainersService } from "./trainers.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateTrainerDto } from "./trainers.dto/trainerDTO";
import { Role } from "src/authorization/roles/role.enum";
import { Roles } from "src/authorization/roles/roles.decorator";
import { RolesGuard } from "src/authorization/roles/roles.guard";
import { JwtAuthGuard } from "src/authorization/jwt/jwt-auth.guard";

@ApiTags('Тренеры') 
@Controller('trainers')
export class TrainersController{
	constructor(private readonly trainersService: TrainersService) {}
	@Get()
	@Roles(Role.Admin, Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	findAll(){
		return this.trainersService.findAll();
	}
	@Get(':id')
	@Roles(Role.Admin, Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	findOne(@Param('id') id: string){
		return this.trainersService.findOne(+id);
	}
	@Put(':id')
	@Roles(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	update(@Param('id') id: string, @Body() updateTrainer: Trainer){
		return this.trainersService.update(+id, updateTrainer);
	}
	@Post()
	@Roles(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	create(@Body() createTrainer: CreateTrainerDto){
		return this.trainersService.create(createTrainer);
	}
	@Delete(':id')
	@Roles(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	remove(@Param('id') id: string){
		return this.trainersService.remove(+id);
	}
	/*@Delete() 
	clear(){
		return this.trainersService.clear();
	}*/
	@ApiBearerAuth()
	@Get('incomplete')
	findIncomplete(){
		this.trainersService.findIncomplete();
	}

}



