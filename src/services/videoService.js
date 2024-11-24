
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class VideoService{
    create(videoData){
        try {
        return  prisma.video.create(
            {data:videoData}
        );

    } catch (error) {
        throw new Error(error);
        
    }

   }
    getAll(){
    try {
        return  prisma.video.findMany();

    } catch (error) {
        throw new Error(error);
        
    }
   }

   get(_id){
        try {
        return  prisma.video.findUnique(
           { where:{
                id:_id
            }}
            
        );

    } catch (error) {
        throw new Error(error);
        
    }

   }
   update(id,videoData){
        try {
        return  prisma.video.update(
           { where:{
                id
            },
            data:videoData}
        );

    } catch (error) {
        throw new Error(error);

    }
   }
   delete(_id){
        try {
        return  prisma.video.delete({
            where: {
                id:_id
            }
          })
    } catch (error) {
        throw new Error(error);
        
    }

   }
}