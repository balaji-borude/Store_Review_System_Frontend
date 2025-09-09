import express from "express";
import { signUp,login,changePassword } from "../controller/Auth.js";
import {auth} from '../middlewares/auth.js'

const router = express.Router();

router.post("/signup", signUp);
router.post("/login",login);
router.put("/changePassword",auth,changePassword);

export default router;
