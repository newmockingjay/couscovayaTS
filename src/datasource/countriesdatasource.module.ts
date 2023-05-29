import { Module } from '@nestjs/common';
import { TrainersDatasourceService } from './countriesdatasource.service';  

@Module({
  providers: [TrainersDatasourceService], 
  exports: [TrainersDatasourceService], 
})

export class TrainersDatasourceModule {}
