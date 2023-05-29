import { Controller, Get, Param, Put, Body, Post, Delete, UseGuards } from "@nestjs/common";
import {  GroupsService } from "./groups.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from "src/authorization/roles/roles.decorator";
import { Role } from "src/authorization/roles/role.enum";
import { JwtAuthGuard } from "src/authorization/jwt/jwt-auth.guard";
import { RolesGuard } from "src/authorization/roles/roles.guard";
import { Group } from "./group.entity";
import { CreateGroupDto } from "./groups.dto/groupDTO";

@ApiTags('Группы') 
@Controller('groups')
export class GroupsController{
	constructor(private readonly groupsService: GroupsService) {}
	@Get()
	@Roles(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	findAll(){
		return this.groupsService.findAll();
	}
	@Get(':id')
	@Roles(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	findOne(@Param('id') id: string){
		return this.groupsService.findOne(+id);
	}
	@Put(':id')
	@Roles(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	update(@Param('id') id: string, @Body() updategroup: Group){
		return this.groupsService.update(+id, updategroup);
	}
	@Post()
	@Roles(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	create(@Body() creategroup: CreateGroupDto){
		return this.groupsService.create(creategroup);
	}
	@Delete(':id')
	@Roles(Role.Admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	remove(@Param('id') id: string){
		return this.groupsService.remove(+id);
	}

}



