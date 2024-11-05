import { Express } from "express";
import { dashboard } from "./dashboard.route";
import { systemConfig } from "../../config/config";
import { topicRouter } from "./topic.router";

const adminRoutes = (app: Express):void =>{
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`
    app.use(`${PATH_ADMIN}/dashboard`,dashboard);
    app.use(`${PATH_ADMIN}/topics`,topicRouter)
}

export default adminRoutes;