/**
 * 
 * @param {*} user 
 * @param {*} rules 
 * @returns 
 */
 
const rules={
  "name":  {
        validator:(_name)=>typeof _name==='string' && _name.length >=3,
        message:"Le nom doit être une chaine de caractère avec au moins trois caractère"
     },
     "email":  {
        validator:(_email)=>typeof _email==='string' && /^[a-zA-Z0-9]+\@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(_email),
        message:"l'email n'est pas valide"
     },
}

const userValidator=(user,rules)=>{
    return new Proxy(user,{
        set(user,prop,new_value){
            const FiedRule=rules[prop]
            if(typeof FiedRule=="object"){
                if(FiedRule.validator(new_value)){
                    return  Reflect.set(user,prop,new_value)
                }
                throw new Error(FiedRule.message);
                
            }
            throw new Error("propriete inavalide");
                
           
         
            

        }
    })
}
const  user=userValidator({
    name:"sankara",
    email:"ss@gmail.com"
},rules);

//user.name="sqqs"
user.email="sqqs"