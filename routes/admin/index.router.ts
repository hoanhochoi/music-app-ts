import { Express } from "express";
import { dashboard } from "./dashboard.route";
import { systemConfig } from "../../config/config";

const adminRoutes = (app: Express):void =>{
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`
    app.use(`${PATH_ADMIN}/dashboard`,dashboard);

}

export default adminRoutes;