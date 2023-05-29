import { Injectable } from '@nestjs/common';
import { Discipline } from 'src/disciplines/discipline.entity';

@Injectable()
export class DisciplinesDatasourceService {
  private disciplines: Discipline[] = [
    
  ];

  getDisciplines(): Discipline[] {
    return this.disciplines;
  }
}