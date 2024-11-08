import {Router} from "express";
const router: Router = Router();
import * as  controller from "../../controllers/admin/topic.controller";
import { changeStatus } from "../../controllers/admin/song.controller";

router.get("/",controller.index)

router.patch("/change-status/:status/:id",controller.changeStatus)

export const topicRouter: Router = router;