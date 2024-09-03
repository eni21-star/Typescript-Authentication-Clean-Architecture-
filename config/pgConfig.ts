import { Sequelize } from "sequelize";


export const pg = new Sequelize('node','postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
})
