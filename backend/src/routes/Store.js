import express from "express";
import {createStore,updateStore,deleteStore,getAllStores,getMyStores} from "../controller/StoreController.js";
import {auth} from '../middlewares/auth.js'

// TODO ==> have to add middlwares 


const router = express.Router();

router.post("/createStore",auth, createStore);
router.put("/updateStore",updateStore);
router.delete("/deleteStore",deleteStore);

// get all route fakt user bagnar ahe na ==>
router.get("/getAllStores",auth, getAllStores);

router.get("/getMyStores",auth,getMyStores);


export default router;
