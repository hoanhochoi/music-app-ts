import { Router } from "express";
import multer from "multer";
const router: Router = Router();
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"
import * as controller from "../../controllers/admin/upload.controller"
const upload = multer(); // luu y: multer de sau router

router.post(
    "/", 
    upload.single("file"),
    uploadCloud.uploadSingle,
    controller.index,
)

export const uploadRouters : Router = router;