"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = require("./dashboard.route");
const config_1 = require("../../config/config");
const topic_router_1 = require("./topic.router");
const song_route_1 = require("./song.route");
const upload_router_1 = require("./upload.router");
const singer_route_1 = require("./singer.route");
const adminRoutes = (app) => {
    const PATH_ADMIN = `/${config_1.systemConfig.prefixAdmin}`;
    app.use(`${PATH_ADMIN}/dashboard`, dashboard_route_1.dashboard);
    app.use(`${PATH_ADMIN}/topics`, topic_router_1.topicRouter);
    app.use(`${PATH_ADMIN}/songs`, song_route_1.songRouters);
    app.use(`${PATH_ADMIN}/upload`, upload_router_1.uploadRouters);
    app.use(`${PATH_ADMIN}/singers`, singer_route_1.singerRoute);
};
exports.default = adminRoutes;
