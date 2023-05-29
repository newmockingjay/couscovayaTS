import { Injectable } from '@nestjs/common';
import { Trainer } from 'src/trainers/trainer.entity';

@Injectable()
export class TrainersDatasourceService {
  private trainers: Trainer[] = [];

  getTrainers(): Trainer[] {
    return this.trainers;
  }
}