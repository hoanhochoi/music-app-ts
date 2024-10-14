import {Express} from "express"
import { TopicRoutes } from "./topic.route"
import { SongRoutes } from "./song.route";

const clientRoutes = (app: Express):void =>{
    app.use("/topics",TopicRoutes)
    app.use("/songs",SongRoutes)
};
export default clientRoutes;