import { Module } from '@nestjs/common';
import { DisciplinesDatasourceService } from './salesdatasource.service';

@Module({
  providers: [DisciplinesDatasourceService], 
  exports: [DisciplinesDatasourceService], 
})

export class DisciplinesDatasourceModule {}
