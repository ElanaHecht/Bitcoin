export const userService =  {
   getUser,
 }
 
 const user = {
     name: "Elana Hecht",
     coins: 110,
     moves: []
   };
 
 function getUser() {
   return new Promise((resolve, reject) => {
     resolve(user)
   })
 }
 
 