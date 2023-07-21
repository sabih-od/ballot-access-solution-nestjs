import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RolesSeeder } from './roles/roles.seeder';
import { UsersSeeder } from './users/users.seeder';
import { PermissionsSeeder } from './database/seeders/permissions.seeder';

@Injectable()
export class AppService implements OnApplicationBootstrap {

  constructor(
    private usersSeeder: UsersSeeder,
    private rolesSeeder: RolesSeeder,
    private permissionsSeeder: PermissionsSeeder
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onApplicationBootstrap(): Promise<any> {
    // add a functionality to check if the data already exists, if not add it manually
    this.rolesSeeder.init()
    this.permissionsSeeder.init()
    this.usersSeeder.init()

  }
}