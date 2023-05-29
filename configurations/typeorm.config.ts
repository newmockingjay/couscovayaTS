import { Client } from 'src/clients/client.entity';
import { Discipline } from 'src/disciplines/discipline.entity';
import { Trainer } from 'src/trainers/trainer.entity';
import { DataSource } from 'typeorm';

const ormConfig: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'education',
  username: 'postgres',
  password: '158821Xy',
  entities: ['dist/src/**/*.entity{.ts,.js}'],
  //entities: [Client, Discipline, Trainer],
  logging: true,
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['dist/src/migrations/*{.ts,.js}'],
});

//ormConfig.initialize();
export default ormConfig;