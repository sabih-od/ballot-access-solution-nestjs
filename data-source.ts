import { HttpException, HttpStatus } from "@nestjs/common";
import { DataSource, DataSourceOptions } from "typeorm";



export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: '192.168.56.56',
    // host: '127.0.0.1',
    port: 3306,
    // username: 'servicedemoweb_dev',
    // password: 'servicedemoweb_dev',
    // database: 'servicedemoweb_ballot_access_solution',
    username: 'homestead',
    password: 'secret',
    database: 'ballot-access-solution',
    entities: ["dist/**/*.entity.js"],
    // migrations: ['dist/database/migrations/*js'],
    synchronize: true,
    logging: true
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource;

export async function runCustomQuery(query: string, parameters?: any[]): Promise<any> {
  const connection: any = dataSource.manager.connection;

  try {
    // Check if the connection is established before running the query
    if (!connection.isConnected) {
      await connection.connect(); // Establish the connection if it's not already connected
    }

    const result = await connection.query(query, parameters);
    return result;
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}