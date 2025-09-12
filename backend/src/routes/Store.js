import express from "express";
import {createStore,updateStore,deleteStore,getAllStores} from "../controller/StoreController.js";
import {auth} from '../middlewares/auth.js'

// TODO ==> have to add middlwares 


const router = express.Router();

router.post("/createStore",auth, createStore);
router.put("/updateStore",updateStore);
router.delete("/deleteStore",deleteStore);

// get all route fakt user bagnar ahe na ==>
router.get("/getAllStores", getAllStores);


export default router;
