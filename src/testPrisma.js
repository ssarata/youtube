import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

 async function main() {
//     const users= await prisma.user.create({
//         data: {
//             email: 'ss@gmail.com',
//             name: 'sankara',
//             },
//       })
   const us = await prisma.test.findMany()
    console.log(us);
    
  }
//   main()
//   .then(async () => {
//     console.log("succès");
//   })
//   .catch(async (e) => {
//     console.error(e)
//   }).finally(async()=>{
//     await prisma.$disconnect()
//   })

// async function main() {
//   const tests= await prisma.test.create({
//       data: {
//           libelle: 'bic',
//           },
//     })
//   const us = await prisma.test.findMany()
//   console.log(us);
  
// }
// main()
// .then(async () => {
//   console.log("succès");
// })
// .catch(async (e) => {
//   console.error(e)
// }).finally(async()=>{
//   await prisma.$disconnect()
// })