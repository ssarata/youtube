console.log(":::::::::::::::::::::::::");
const user={
    name:"koundi",
    age:18,
    genre:"M"
 }
const userProxy =new Proxy(user,{
    get(target,prop,recevier){
        console.log("la propriéte "+prop+" à ete crer");
         console.log(target);
        // console.log(recevier);
        // if (prop==="age"){
        //     target[prop]=target[prop]/2
        //     return target[prop]
        // }
        // else{
            return Reflect.get(target,prop)
      //  }
    },
    set(target,prop,value){
       // console.log(arguments);
       // return  Reflect.get(target,prop,value)
        return  Reflect.get(...arguments)

        
    }
})
userProxy.age=28
//console.log({...user});
console.log(userProxy.name);
//  console.log(userProxy.name);
// console.log(userProxy.genre);


