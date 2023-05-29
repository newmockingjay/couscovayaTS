export class IncompletedClientDto{
	id: number;
	fullname: string;
}

// import { PickType } from '@nestjs/swagger';
// import { Client } from '../client.entity';

// export class IncompletedClientDto extends PickType(Client, ['id', 'fullname']) {}