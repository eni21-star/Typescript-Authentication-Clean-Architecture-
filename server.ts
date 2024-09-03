import { userModel } from "./models/userModel";
import { pg } from "./config/pgConfig";
import { app } from "./app";
import dotenv from 'dotenv'
import { logger } from "./config/loggerConfig";
dotenv.config()
const PORT: number =  Number(process.env.PORT) || 8080


pg.authenticate()
.then(()=>{
    app.listen(PORT, async()=>{
        await pg.sync({force: true})
        logger.info("connected to DB")
        logger.info(`server is running on port ${PORT}`)
    })
})
.catch(()=>{
    logger.info("error connecting to DB")
})