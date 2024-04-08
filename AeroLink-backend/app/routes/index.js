import userRouter from "./user-route.js"
import flightRouter from "./flight-route.js"
// define endpoints related to campaign model
export default (app) => {
    // app.use('/refresh',refreshRouter);
    app.use('/user', userRouter)
    app.use('/flight',flightRouter)
}