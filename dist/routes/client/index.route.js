"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const favorite_route_1 = require("./favorite.route");
const search_route_1 = require("./search.route");
const clientRoutes = (app) => {
    app.use("/topics", topic_route_1.TopicRoutes);
    app.use("/songs", song_route_1.SongRoutes);
    app.use("/favorite-songs", favorite_route_1.favoriteRoutes);
    app.use("/search", search_route_1.searchRoutes);
};
exports.default = clientRoutes;
