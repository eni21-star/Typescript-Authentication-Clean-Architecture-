import { logger } from "../../../config/loggerConfig";
import { BadreqError } from "../../../errors/errors";
import authServices from "../../services/authServices";
import { Request, Response , NextFunction} from "express";
import {createReturnAttributes, apiRegisterReturnAttributes} from '../../repositories/Interfaces'
import { handleError } from "../../../errors/errorHandler";



const registerController = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{ // because our return is interacting with res in express

 try {

  const {email, username, password, role} = req.body

  const verified: boolean = false // ts is smart enough to already tell that the db requires the verified bool
  
  if(!email || !username || !password || !role)
  {
    
     throw new BadreqError('please provide all details/fields for registeration')
  }
  
  const register: apiRegisterReturnAttributes = await authServices.register({email, username, password, role, verified})

  if(register)
  {
  
     res.status(register.statusCode).json(register) // there is no return because we stated void
  }
//   next( new Error('server error'))

 } catch (err) {
   handleError(err, next)
      
 }
}

export default registerController

