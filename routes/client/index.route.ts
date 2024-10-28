import {Express} from "express"
import { TopicRoutes } from "./topic.route"
import { SongRoutes } from "./song.route";
import { favoriteRoutes } from "./favorite.route";
import { searchRoutes } from "./search.route";

const clientRoutes = (app: Express):void =>{
    app.use("/topics",TopicRoutes)
    app.use("/songs",SongRoutes)
    app.use("/favorite-songs",favoriteRoutes)
    app.use("/search",searchRoutes);
};
export default clientRoutes;