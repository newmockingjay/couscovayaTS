import { Controller, Request, Post, UseGuards, Get, UnauthorizedException, Body } from '@nestjs/common';
// import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { TheUser } from 'src/authorization/users/users.entity';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from '../local/local-auth.guard';
// import { AuthEntity } from './auth.entity';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiBearerAuth()
	@ApiOkResponse(/*{ type: AuthEntity }*/)
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Body() user: TheUser) {
	const result = await this.authService.login(user);
	if (!result) {
		return new UnauthorizedException('Username or password is incorrect');
	}
		return result;
	}

	/*@Post('profile')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('access-token')
	async profile() {
		return 'Authorized';
 	}*/

	/*@ApiBearerAuth()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	@ApiOkResponse()
	async login(@Request() req) {
		return this.authService.login(req.user); //
	}*/
	/*@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get('profile')
	@ApiOkResponse({type: TheUser})
	getProfile(@Request() req) {
		return req.user;
	}*/
}