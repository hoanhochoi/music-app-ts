import { Router } from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/song.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"
const upload = multer();

const router: Router = Router();

router.get("/",controller.index);

router.get("/create",controller.create);

router.post("/create",upload.single("avatar"),uploadCloud.uploadSingle,controller.createPost);


router.patch("/change-status/:status/:id",controller.changeStatus);

export const songRouters: Router = router;
