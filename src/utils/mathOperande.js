export const somme=(q,z)=> q+z;
console.log(somme(2,3));

export const soustraction=(q,z)=> q-z;
console.log(soustraction(2,3));

// module.exports={
//     somme,
//     soustraction
// }
// module={
//     somme,
//     soustraction
// }
// export default module

export default function add(q,z){
    return q+z
}