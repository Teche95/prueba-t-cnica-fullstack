"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const Cripto_1 = require("./entitie/Cripto");
const Users_1 = require("./entitie/Users");
exports.appDataSource = new typeorm_1.DataSource({
    host: "localhost",
    type: "postgres",
    port: 5432,
    username: "postgres",
    password: "centinela",
    database: "criptomonedas",
    synchronize: true,
    entities: [Cripto_1.Cripto, Users_1.Users],
    logging: true,
});
