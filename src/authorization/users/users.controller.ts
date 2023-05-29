import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { TheUser } from './users.entity';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';

@Controller('users')
export class UsersController {
 constructor(private readonly usersService: UsersService) {}
 
 /*@ApiBearerAuth()
 @Get()
 @UseGuards(JwtAuthGuard)
 @ApiOkResponse()
 async findAll(): Promise<TheUser[]> {
	 return this.usersService.findall();
 }*/

 @Roles(Role.Admin, Role.User)
 @Get()
 @UseGuards(JwtAuthGuard, RolesGuard)
 @ApiBearerAuth()
 @ApiOkResponse({ type: TheUser/*, isArray: true*/ })
 async findAll() {
 	const users = await this.usersService.findall();
 	return users/*.map((user) => new TheUser())*/;
 }

 @Roles(Role.Admin)
 @Get(':userId')
 @UseGuards(JwtAuthGuard, RolesGuard)
 @ApiBearerAuth()
 @ApiOkResponse({ type: TheUser })
 async findOneId(@Param('userId', ParseIntPipe) userId: number) {
   return this.usersService.findOneId(userId);
 }
}