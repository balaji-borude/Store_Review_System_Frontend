import express from "express";
import { signUp,login,changePassword,getAllUser } from "../controller/AuthController.js";
import {auth} from '../middlewares/auth.js'


const router = express.Router();

router.post("/signup", signUp);
router.post("/login",login);
router.put("/changePassword",auth,changePassword);
router.get("/getAllUser",getAllUser);




export default router;
