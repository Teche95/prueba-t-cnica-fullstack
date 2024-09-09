"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
require("./types/express");
const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    try {
        // Verificar el token de forma sincrónica usando una promesa
        const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET_JWT_KEY);
        // Guardar la información decodificada del usuario en req.user
        req.user = decoded;
        // Continuar con la siguiente función de middleware o ruta
        next();
    }
    catch (error) {
        // Si hay algún error (token inválido o expirado), manejar el error
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.authRequired = authRequired;
