"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.protectedRoute = exports.register = exports.login = exports.deleteCripto = exports.updateCripto = exports.getCripto = exports.addCripto = void 0;
const Cripto_1 = require("../entitie/Cripto");
const Users_1 = require("../entitie/Users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
// import cookieParser from "cookie-parser"
const bcrypt_1 = __importDefault(require("bcrypt"));
const addCripto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, ticker, precio_de_compra, cantidad_comprada } = req.body;
    try {
        const cripto = new Cripto_1.Cripto();
        cripto.nombre = nombre;
        cripto.ticker = ticker;
        cripto.precio_de_compra = precio_de_compra;
        cripto.cantidad_comprada = cantidad_comprada;
        yield cripto.save();
        return res.json(cripto);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.addCripto = addCripto;
const getCripto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const criptos = yield Cripto_1.Cripto.find();
        return res.json(criptos);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getCripto = getCripto;
const updateCripto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.params)
    try {
        const { id } = req.params;
        const cripto = yield Cripto_1.Cripto.findOneBy({ id: Number(id) });
        if (!cripto)
            return res.status(404).json({ message: "cripto not found" });
        console.log(req.body);
        yield Cripto_1.Cripto.update({ id: Number(id) }, req.body);
        // console.log(cripto)
        return res.json("cripto updated");
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.updateCripto = updateCripto;
const deleteCripto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Cripto_1.Cripto.delete({ id: Number(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "cripto not found" });
        return res.json("cripto deleted");
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteCripto = deleteCripto;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield Users_1.Users.findOneBy({ email });
        if (!user)
            return res.status(400).json({ message: "user not found" });
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "invalid password" });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.SECRET_JWT_KEY, { expiresIn: "3m" });
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
        }).send({ user, token });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        const userExists = yield Users_1.Users.findOneBy({ username });
        if (userExists)
            return res.status(404).json({ message: "user already exists" });
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const user = new Users_1.Users();
        user.username = username;
        user.password = passwordHash;
        user.email = email;
        const userCreated = yield user.save();
        const token = jsonwebtoken_1.default.sign({ id: userCreated.id, username }, config_1.SECRET_JWT_KEY, { expiresIn: "3m" });
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
        }).send({ user, token });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.register = register;
const protectedRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("protected route");
});
exports.protectedRoute = protectedRoute;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("access_token", "", {
        expires: new Date(0),
    }).send();
});
exports.logout = logout;
