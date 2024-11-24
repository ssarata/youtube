import express from "express"
import AuthController from "../controllers/AuthController.js";

export default class AuthRouter{
     router;
     authController;
    constructor(){
        this.router=express.Router();
        this.authController=new AuthController()
        this.initializeRoutes();
    }

     initializeRoutes(){ 
        this.router.post("/login",this.authController.login.bind(this.authController))
       
     }
     getRouter(){
        return this.router;
     }
}
