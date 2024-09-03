import express from 'express'
import { logger } from './config/loggerConfig'
import { Response, Request, NextFunction } from 'express'
import { BadreqError, ConflictError, NotFoundError, UnauthorizedError } from './errors/errors'
//cors 
//passport
export const app = express()



//middlewares
//app.use(cors())
app.use(express.json())
//app.use(passport.initialize())
//passportAuth()
app.use((req, res, next) => {
    logger.info(`HTTP ${req.method} ${req.url}`);
    next();
});



// Routes
import registerRouter from './Authentication/api/routes/registerRoute'
//const loginRouter = require("./src/routes/auth/loginRoute.js")
//const verifyMailrouter = require("./src/routes/auth/verifyMail.js")
//const oAuthrouter = require("./src/routes/auth/oauthRoute.js")
//const oauthCallbackrouter = require("./src/routes/auth/oauthCallback.js")
//const forgotPasswordrouter = require("./src/routes/auth/forgotPasswordRoute.js")
//const resetPasswordrouter = require("./src/routes/auth/resetPasswordRoute.js")





// route handlers
app.use('/api/v1/register', registerRouter)
// app.use('/api/v1/login', loginRouter)
// app.use('/verify', verifyMailrouter)
// app.use('/api/v1/auth/google', oAuthrouter)
// app.use('/api/v1/auth/google/callback', oauthCallbackrouter)
// app.use('/api/v1/forgot-password', forgotPasswordrouter)
// app.use('/api/v1/reset-password', resetPasswordrouter)





//error handling middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BadreqError || err instanceof ConflictError || err instanceof NotFoundError || err instanceof UnauthorizedError) {
        const statusCode = err.statusCode || 500;
        const message = err.isOperational ? err.message : 'Internal Server Error';
        res.status(statusCode).json({ message });
    } else {
        // For non-custom errors
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



