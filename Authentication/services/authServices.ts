import authRepo from "../repositories/authRepo";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { findReturnAttributes, createReturnAttributes, UserAttributes, userLogin, apiRegisterReturnAttributes } from "../repositories/Interfaces";
import { logger } from "../../config/loggerConfig";
import { BadreqError, ConflictError, NotFoundError, UnauthorizedError } from '../../errors/errors'
import dotenv from 'dotenv'
import { verifyEmail } from "../../utils/mail/verifyMail";
import { handleError } from "../../errors/errorHandler";

dotenv.config()

class authService {

    async register(data: UserAttributes): Promise<apiRegisterReturnAttributes> { // looking to design an interface for this response
        let { username, email, password, role, verified } = data // do not use const password shouldnt be passed as a constant value
       
        try {
            const checkEmail: findReturnAttributes | null = await authRepo.findEmail(email) 

            if (checkEmail) {
                throw new ConflictError('email already exist')
            }

            const newPassword: string = await bcrypt.hash(data.password, 12)

            password = newPassword

            const newAccount: createReturnAttributes | null = await authRepo.newAccount({username, email, password, role, verified})

            if (!newAccount) {
                throw new Error('Error creating account')
            }

            const payload = {
                id: newAccount.id
            }
            const secret = process.env.ACCESS_SECRETKEY as string // assure ts that secret will always be defined as a string

            const token = jwt.sign(payload, secret, { expiresIn: '1hr' }) // might change the expired format

            await verifyEmail(username, token, email) // might change because it is slowing down response

            return { status: "success", data: { newAccount }, message: "Account created successfully", statusCode: 202 }

        } catch (err) {

            if (err instanceof BadreqError || err instanceof ConflictError || err instanceof NotFoundError || err instanceof UnauthorizedError) {
                throw err
            }
            const error = err as Error;
            logger.error(`Unhandled Error Register Service: ${error.message}`);
            throw error
               
        }
    }

    async login(data: userLogin ): Promise<object>{

        const { email, password } = data
        if(!email || !password)
        {
            throw new BadreqError('input username and password')
        }


        try {

            const checkEmail: findReturnAttributes | null = await authRepo.findEmail(email)

            if (!checkEmail) {
                throw new NotFoundError('email does not exist, please create an account first')
            }

            const comparePass:boolean = await bcrypt.compare(password, checkEmail.password)

            if (comparePass) {

                const payload = {
                    id: checkEmail.id
                }

                const secret = process.env.ACCESS_SECRETKEY as string
                const accessToken = jwt.sign(payload, secret, { expiresIn: "15m" })
                return { status: "success", data: { accessToken }, message: "user logged in", statusCode: 200 }
            }

            throw new UnauthorizedError('password is incorrect')

        } catch (err) {
            if (err instanceof BadreqError || err instanceof ConflictError || err instanceof NotFoundError || err instanceof UnauthorizedError) {
                throw err
            }
            const error = err as Error;
            logger.error(`Unhandled Error Login Service: ${error.message}`);
            throw error
        }
    }
    async verifyEmail(id: number): Promise<object | null> {  // check back on this
      
        if(!id)
        {
            throw new BadreqError('error verifying mail, no user with id ')
        }

        try {

            const verifyEmail = await authRepo.verify(id)
            if (verifyEmail) {
                return { status: "success", data: { verifyEmail }, message: "email verified", statusCode: 200 }
            }
            return null // not sure why i am even doing this, supposed to be throwing an error, will check back


        } catch (err) {
            if (err instanceof BadreqError || err instanceof ConflictError || err instanceof NotFoundError || err instanceof UnauthorizedError) {
                throw err
            }
            const error = err as Error;
            logger.error(`Unhandled Error verifyEmail Service: ${error.message}`);
            throw error
        }
    }
}

export default new authService()