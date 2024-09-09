import { Request, Response } from "express"
import { Cripto } from "../entities/Cripto"
import { Users } from "../entities/Users"
import jwt from "jsonwebtoken"
import { SECRET_JWT_KEY } from "../config"
import bcrypt from "bcrypt"

export const addCripto = async (req: Request, res: Response) => {

    const { nombre, ticket, precioCompra, cantidadComprada } = req.body

    try {

        const cripto = new Cripto()
        cripto.nombre = nombre
        cripto.ticker = ticket
        cripto.precio_de_compra = precioCompra
        cripto.cantidad_comprada = cantidadComprada
        cripto.cantidad_invertida = precioCompra * cantidadComprada


        await cripto.save()

        return res.json(cripto)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const getCripto = async (req: Request, res: Response) => {
    try {
        const criptos = await Cripto.find()
        return res.json(criptos)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const getCriptoById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const criptoById = await Cripto.findOneBy({ id: Number(id) })
        if (!criptoById) return res.status(404).json({ message: "cripto not found" })

        return res.json(criptoById)

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const updateCripto = async (req: Request, res: Response) => {

    const { nombre, ticker, precio_de_compra, cantidad_comprada } = req.body
    const { id } = req.params

    try {
        const cripto = await Cripto.findOneBy({ id: Number(id) })

        if (!cripto) return res.status(404).json({ message: "cripto not found" })

        cripto.nombre = nombre
        cripto.ticker = ticker
        cripto.precio_de_compra = precio_de_compra
        cripto.cantidad_comprada = cantidad_comprada
        cripto.cantidad_invertida = precio_de_compra * cantidad_comprada

        await cripto.save()
      
        return res.json("cripto updated")
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const deleteCripto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await Cripto.delete({ id: Number(id) })
        if (result.affected === 0) return res.status(404).json({ message: "cripto not found" })
        return res.json("cripto deleted")
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await Users.findOneBy({ email })
        if (!user) return res.status(400).json({ message: "user not found" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "invalid password" })


        const token = jwt.sign({ id: user.id }, SECRET_JWT_KEY, { expiresIn: "1h" })
        res.cookie("access_token", token, {
            // httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            // sameSite: "strict",
        }).send({ user, token })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const register = async (req: Request, res: Response) => {
    const { username, password, email } = req.body

    try {
        const userExists = await Users.findOneBy({ username })
        if (userExists) return res.status(404).json({ message: "user already exists" })

        const passwordHash = await bcrypt.hash(password, 10)

        const user = new Users()
        user.username = username
        user.password = passwordHash
        user.email = email

        const userCreated = await user.save()

        const token = jwt.sign({ id: userCreated.id, username }, SECRET_JWT_KEY, { expiresIn: "7h" })
        res.cookie("access_token", token, {
            // httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            // sameSite: "strict",
        }).send({ user, token })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const logout = async (req: Request, res: Response) => {
    res.cookie("access_token", "", {
        expires: new Date(0),
    }).send()
}