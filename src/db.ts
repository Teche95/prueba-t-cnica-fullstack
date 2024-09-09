import { DataSource } from "typeorm"
import { Cripto } from "./entities/Cripto"
import { Users } from "./entities/Users"


export const appDataSource = new DataSource({
    host: "localhost",
    type: "postgres",
    port: 5432,
    username: "postgres",
    password: "centinela",
    database: "criptomonedas",
    synchronize: true,
    entities: [Cripto, Users],
    logging: true,

})

