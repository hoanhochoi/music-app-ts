import { Router } from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/song.controller";

const upload = multer();

const router: Router = Router();

router.get("/",controller.index);

router.get("/create",controller.create);

router.post("/create",upload.single("avatar"),controller.createPost);

export const songRouters: Router = router;
