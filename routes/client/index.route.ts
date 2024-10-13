import {Express} from "express"
import { TopicRoutes } from "./topic.route"

const clientRoutes = (app: Express):void =>{
    app.use("/topics",TopicRoutes)
};
export default clientRoutes;