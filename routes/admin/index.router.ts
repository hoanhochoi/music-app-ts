import { Express } from "express";
import { dashboard } from "./dashboard.route";
import { systemConfig } from "../../config/config";
import { topicRouter } from "./topic.router";
import { songRouters } from "./song.route";
import {uploadRouters} from "./upload.router"
import { singerRoute } from "./singer.route";

const adminRoutes = (app: Express):void =>{
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`
    app.use(`${PATH_ADMIN}/dashboard`,dashboard);
    app.use(`${PATH_ADMIN}/topics`,topicRouter)
    app.use(`${PATH_ADMIN}/songs`,songRouters)
    app.use(`${PATH_ADMIN}/upload`,uploadRouters)
    app.use(`${PATH_ADMIN}/singers`,singerRoute)
}

export default adminRoutes;