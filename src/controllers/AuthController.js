import UserService from "../services/userService.js"
import * as status  from "../constantes/httpStatus.js"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
export default class AuthController{
    userService;
    constructor(){
        this.userService=new UserService;
    }

    async login(req,res){
        const{email,password}=req.body
        try {
            const user= await this.userService.findByUserEmail(email);
            console.log(user);
            //res.send("eee")
            if(user===null){
               
              return  res.status(status.HTTP_500_INTERNAL_SERVER_ERROR)
                        .json({message:"email ou passorwd incorrect(user es null)"})  
                } 

                console.log(password);
                console.log(user.password);
                const vaildPasswor= await bcrypt.compare(password,user.password)
                //console.log(vaildPasswor);
                if(!vaildPasswor){
                    return  res.status(status.HTTP_500_INTERNAL_SERVER_ERROR)
                                .json({message:"email ou passorwd incorrect"})  

                }
                const payload={
                    id: user.id,name:user.name,password:user.password 
                }
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'});
                res.send({token})
            }
       catch (error) {
        console.error(error);
       // res.json([])
      //  res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json()
    }
    }
        
}