import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/client/song.controller";

router.get("/:slugTopic",controller.list)

router.get("/detail/:slugSong",controller.detail)

router.patch("/like/:typeLike/:id",controller.like);

router.patch("/favorite/:typeFavorite/:id",controller.favorite);

router.patch("/listen/:id",controller.listen)
export const SongRoutes: Router = router;