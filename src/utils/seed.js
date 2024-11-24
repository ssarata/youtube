import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
class Seed{
  static async  seedUser(){
       let data_users=[
            {
                email: 'sarata@gmail.com',
                name: 'sankara',
            },
            // {
            //     email: 'beveri@gmail.com',
            //     name: 'beveri',
            //     },
        ]
        Seed.runSeederUser(data_users).then((result)=>{

            console.log("finsih");
            
        }).catch((e)=>{
            console.log("error");
            console.error(e);
            
        }).finally(async()=>{
            await prisma.$disconnect()
        })
        
    }
     static runSeederUser(data){
        return  prisma.user.createMany({
            data:data})

    }
}
Seed.seedUser()

// async function seedUser(){
//     const users= await prisma.user.create({
//                 data: {
//                     email: 'ss@gmail.com',
//                     name: 'sankara',
//                     },
//               })
//     const farida= await prisma.user.create({
//     data: {
//         email: 'beveri@gmail.com',
//         name: 'beveri',
//         },
//     })
//     const zina= await prisma.user.create({
//         data: {
//             email: 'zina@gmail.com',
//             name: 'zina',
//             },
//       })
//        const akoh= await prisma.user.create({
//         data: {
//             email: 'akoh@gmail.com',
//             name: 'akoh',
//             },
//       })
// }   
    
// seedUser()
