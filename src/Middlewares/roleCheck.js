import { customError } from "../Utils/errorClass.js"

export const roleCheck = (...roles)=> {
 
   return (req, res, next)=> {  
      if(!roles.includes(req.user.role)) {
        throw new customError(401 , "You are not authorized")
      }
    next()
   }
}