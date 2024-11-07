import express,{Express,Response,Request} from "express"
import dotenv from "dotenv"
import path  from "path"; // path là thư viện có sẵn nodejs
import * as database from "./config/database";
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.router";
import { systemConfig } from "./config/config";
dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// nhúng file tĩnh
app.use(express.static("public"))

app.set("views","./views")
app.set("view engine","pug")

// tinyMCE
app.use(
    "/tinymce",express.static(path.join(__dirname,"node_modules","tinymce"))
)

// app local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Admin routes
adminRoutes(app);
// Client routes
clientRoutes(app);
// app.get("*",(req: Request,res:Response)=>{ // tất cả các route không giống ở admin và clint 
//     res.render("./client/pages/error/404.pug",{
//       pageTitle: "lỗi"
//     })
//   }) khi xong thì bật lại

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})