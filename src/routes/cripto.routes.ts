import { Router } from "express"
import { addCripto, deleteCripto, getCripto, login, updateCripto, register, logout, getCriptoById } from "../controllers/cripto.controllers"
import { authRequired } from "../middlewares/validateToken"


const router = Router()

router.post("/crypto", authRequired, addCripto)

router.get("/crypto/:id", getCriptoById)

router.get("/crypto", getCripto)

router.put("/crypto/:id", authRequired, updateCripto)

router.delete("/crypto/:id", deleteCripto)

router.post("/login", login)

router.post("/register", register)

router.post("/logout", logout)


export default router