import { DataSource, DataSourceOptions } from "typeorm";
export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: '192.168.56.56',
    port: 3306,
    username: 'homestead',
    password: 'secret',
    // host: '127.0.0.1',
    // port: 3306,
    // username: 'root',
    // password: '',
    database: 'ballot-access-solution',
    entities: ["dist/**/*.entity.js"],
    migrations: ['dist/database/migrations/*js'],
    synchronize: true,
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource