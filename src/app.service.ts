import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RolesSeeder } from './roles/roles.seeder';
import { UsersSeeder } from './users/users.seeder';

@Injectable()
export class AppService implements OnApplicationBootstrap {

  constructor(
    private usersSeeder: UsersSeeder,
    private rolesSeeder: RolesSeeder,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onApplicationBootstrap(): Promise<any> {
    // add a functionality to check if the data already exists, if not add it manually
    
    this.usersSeeder.init()
    this.rolesSeeder.init()
  }
}