import express,{Router} from "express";//importation d'expresse
import UserRouter from "./routes/userRouter.js"
import VideoRouter from "./routes/videoRouter.js"
import AuthRouter from "./routes/AuthRouter.js"
import jwt from 'jsonwebtoken';
import * as status  from "./constantes/httpStatus.js"

import swaggerSetup from "./docConfig.js"

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';


const app=express()//instance de express
const port=4000

const authMiddleware=(req,res,next)=>{
    const token = req.headers['authorization']?.split(' ')[1];
    jwt.verify(token,JWT_SECRET,(error,user)=>{
        if(error) return res.status(status.HTTP_403_PERMISSION_DENIED).json({message:"token invalide"})
        //console.log(error);
        console.log(user);
    });
    console.log(token);
     next()
    
}
swaggerSetup(app);

//app.use(authMiddleware)

const userRoute= new UserRouter()
app.use(express.json())
app.use('/users',userRoute.getRouter())

const videoRoute=new VideoRouter
app.use(express.json())

app.use('/videos',videoRoute.getRouter())

// const authRoute=new AuthRouter
// app.use('/auths',authRoute.getRouter())


// app.use((req,rep,next)=>{
//     console.log("hello world");
//     console.log(next);
//     return next
    
// })
app.listen(port,()=>{
    console.log(`server start on ${port}`);
    
    
})




































































// const getUsers=(req,res)=>{
//     res.send("users")
// }
// const getUser=(req,res)=>{
//     res.send("user")
// }
// const getNotes=(req,res)=>{
//     res.send("notes")
// }

//const userRouter=new Router()

// userRouter.get('/:id',getUser)
// userRouter.get('/',getUsers)
// app.use('/users',userRouter)
// app.get('/notes',getNotes)

    


