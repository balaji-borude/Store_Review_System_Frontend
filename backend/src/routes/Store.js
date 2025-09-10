import express from "express";
import {createStore,updateStore,deleteStore} from "../controller/StoreController.js";
// import {auth} from '../middlewares/auth.js'

// TODO ==> have to add middlwares 


const router = express.Router();

router.post("/createStore", createStore);
router.put("/updateStore",updateStore);
router.delete("/deleteStore",deleteStore);

export default router;
