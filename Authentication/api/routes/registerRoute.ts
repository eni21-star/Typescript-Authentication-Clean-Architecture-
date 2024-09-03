import express from "express";
const router = express.Router()
import registerController from "../controllers/registerController";
import { BadreqError } from "../../../errors/errors";
import { Request, Response, NextFunction} from "express";
import { body, validationResult } from "express-validator";
type validatorError = {
    message: string
}
const validateRequestBody = [
 
    body('email').notEmpty().isEmail().withMessage("Please enter a valid email"),
    body('username').notEmpty().isString().withMessage("Please enter a valid username"),
    body('password').isAlphanumeric().notEmpty().withMessage("Please enter a strong password"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          
           const arr = errors.errors.map((msg: validatorError)=> msg.message)
           return next( new BadreqError(arr))
        }
        next();
    }
];

router.post('/', validateRequestBody, registerController)




export default router