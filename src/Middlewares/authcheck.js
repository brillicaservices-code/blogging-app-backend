
import { customError } from "../Utils/errorClass.js"
import jwt from "jsonwebtoken"

const authCheck = async(req, res ,next)=> {

    try {
      
      // const token = req.headers.authorization.split(" ")[1];

      const token = req.cookies.token

      console.log(token)

      if (!token) {
        throw new customError(400, "Token not found");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        throw new customError(400, "not a valid token");
      }

      
      req.user = decoded

      next();
    } catch (error) {
       throw new customError(500, error.message)
    }
}


export default authCheck