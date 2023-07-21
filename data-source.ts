import { DataSource, DataSourceOptions } from "typeorm";
export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    // host: '192.168.56.56',
    host: '127.0.0.1',
    port: 3306,
    username: 'servicedemoweb_dev',
    password: 'servicedemoweb_dev',
    database: 'servicedemoweb_ballot_access_solution',
    // username: 'homestead',
    // password: 'secret',
    // database: 'ballot-access-solution',
    entities: ["dist/**/*.entity.js"],
    // migrations: ['dist/database/migrations/*js'],
    synchronize: true,
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource