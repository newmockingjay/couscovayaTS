import { Controller, Get, Param, Put, Body, Post, Delete, UseGuards } from "@nestjs/common";
import { Client } from "./client.entity";
import { ClientsService } from "./clients.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from "./clients.dto/clientDTO";
import { Roles } from "src/authorization/roles/roles.decorator";
import { Role } from "src/authorization/roles/role.enum";
import { JwtAuthGuard } from "src/authorization/jwt/jwt-auth.guard";
import { RolesGuard } from "src/authorization/roles/roles.guard";
import { IncompletedClientDto } from "./clients.dto/incomplete-client.dto";

@Controller('clients')
@ApiTags('Клиенты') 
export class ClientsController{
	constructor(private readonly clientsService: ClientsService) {}
	@Get()
	@Roles(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	findAll(){
		return this.clientsService.findAll();
	}
	@Get(':id')
	@Roles(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	findOne(@Param('id') id: string){
		return this.clientsService.findOne(+id);
	}
	@Put(':id')
	@Roles(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	update(@Param('id') id: string, @Body() updateClient: Client){
		return this.clientsService.update(+id, updateClient);
	}
	@ApiOperation({ summary: 'Создание клиента' })
	@Post()
	@Roles(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	create(@Body() createClient: CreateClientDto){
		return this.clientsService.create(createClient);
	}
	@Delete(':id')
	@Roles(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	remove(@Param('id') id: string){
		return this.clientsService.remove(+id);
	}

	@ApiBearerAuth()
	@Get('incomplete')
	async findIncomplete(): Promise<IncompletedClientDto[]> {
		return await this.clientsService.findIncomplete();
	}

}



