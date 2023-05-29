import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { Client } from './client.entity';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discipline } from 'src/disciplines/discipline.entity';
import { ClientsDatasourceModule } from 'src/datasource/clientsdatasourse.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/authorization/roles/roles.guard';
import { LocalStrategy } from 'src/authorization/local/local.strategy';
import { JwtStrategy } from 'src/authorization/jwt/jwt.strategy';
import { Group } from 'src/groups/group.entity';

@Module({
	controllers: [ClientsController],
	providers: [
		ClientsService,
	],
	imports: [
		ClientsDatasourceModule,
		TypeOrmModule.forFeature([Client, Discipline, Group])
	],
})

export class ClientsModule {}