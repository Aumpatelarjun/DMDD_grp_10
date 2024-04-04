import userRouter from "./user-route.js"

// define endpoints related to campaign model
export default (app) => {
    // app.use('/refresh',refreshRouter);
    app.use('/user', userRouter)
}