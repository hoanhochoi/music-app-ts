import {Express} from "express"
import { TopicRoutes } from "./topic.route"
import { SongRoutes } from "./song.route";
import { favoriteRoutes } from "./favorite.route";

const clientRoutes = (app: Express):void =>{
    app.use("/topics",TopicRoutes)
    app.use("/songs",SongRoutes)
    app.use("/favorite-songs",favoriteRoutes)
};
export default clientRoutes;