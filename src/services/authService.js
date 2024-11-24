
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class AuthService{
    create(userData){
        try {
            return  prisma.user.create({
                data:userData
            });
        } catch (error) {
            throw new Error("erreur");
            
        }
       }

getAll(){
    try {
        return  prisma.user.findMany();
    } catch (error) {
        throw new Error("erreur");
    }
   }

   getUser(_id){
    try {
        return prisma.user.findUnique({
            where:{
                id:_id
            }
        })
    } catch (error) {
        throw new Error(error);
        
    }
      
   }
   update(_id,userData){
    try {
        return prisma.user.update({
            where: {
                id:_id
            },
            data: userData
          })
    } catch (error) {
        throw new Error(error);
        
    }
   
   }
   
   delete(_id){
    try {
        return prisma.user.delete({
            where: {
                id:_id
            }
          })
    } catch (error) {
        throw new Error(error);
        
    }
   
   }

   }
