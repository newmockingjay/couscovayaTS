import { Controller, Get, Param, Put, Body, Post, Delete, UseGuards } from "@nestjs/common";
import { Discipline } from "./discipline.entity";
import { DisciplinesService } from "./disciplines.service";
import { CreateClientDto } from "src/clients/clients.dto/clientDTO";
import { CreateDisciplineDto } from "./disciplines.dto/disciplineDTO";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/authorization/roles/roles.decorator";
import { Role } from "src/authorization/roles/role.enum";
import { JwtAuthGuard } from "src/authorization/jwt/jwt-auth.guard";
import { RolesGuard } from "src/authorization/roles/roles.guard";

@ApiTags('Дисциплины') 
@Controller('disciplines')
export class DisciplinesController{
	constructor(private readonly disciplinesService: DisciplinesService) {}
	@Get()
	@Roles(Role.Admin, Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	findAll(){
		return this.disciplinesService.findAll();
	}
	@Roles(Role.Admin, Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@Get(':id')
	findOne(@Param('id') id: string){
		return this.disciplinesService.findOne(+id);
	}
	@Put(':id')
	@Roles(Role.Admin, Role.User)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	update(@Param('id') id: string, @Body() updateDiscipline: Discipline){
		return this.disciplinesService.update(+id, updateDiscipline);
	}
	@Post()
	@Roles(Role.Admin)
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	create(@Body() createDiscipline: CreateDisciplineDto){
		return this.disciplinesService.create(createDiscipline);
	}
	@Delete(':id')
	@Roles(Role.Admin)
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RolesGuard)
	remove(@Param('id') id: string){
		return this.disciplinesService.remove(+id);
	}
	@ApiBearerAuth()
	@Get('incomplete')
	findIncomplete(){
		this.disciplinesService.findIncomplete();
	}

}



