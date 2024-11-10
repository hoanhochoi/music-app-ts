import { Router } from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/song.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"
const upload = multer();

const router: Router = Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
    "/create",
    upload.fields([{ name: 'avatar', maxCount: 1 },
    { name: 'audio', maxCount: 1 }]),
    uploadCloud.uploadFields,
    controller.createPost
);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

export const songRouters: Router = router;
