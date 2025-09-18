import express from "express";
import {createOwner, updateOwner,deleteOwner } from "../controller/ownerController.js";
// import {isStoreOwner} from '../middlewares/auth.js'


const router = express.Router();

router.post("/createOwner", createOwner);
router.put("/updateOwner",updateOwner);
router.delete("/deleteOwner",deleteOwner);


export default router;