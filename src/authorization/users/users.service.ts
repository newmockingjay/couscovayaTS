import { Injectable } from '@nestjs/common';
import { TheUser } from './users.entity';
import { Role } from '../roles/role.enum';

// This should be a real class/interface representing a user entity
@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: Role.Admin,
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      roles: Role.User,
    },
  ];

  async findOne(username: string): Promise<TheUser | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findOneId(userId: number): Promise<TheUser | undefined> {
    return this.users.find(user => user.userId === userId);
  }

  async findall(): Promise<TheUser[]>{
    return this.users;
  } 
}
