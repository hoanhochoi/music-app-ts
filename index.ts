import express,{Express,Response,Request} from "express"
import dotenv from "dotenv"
import * as database from "./config/database";
import clientRoutes from "./routes/client/index.route";
dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// nhúng file tĩnh
app.use(express.static("public"))

app.set("views","./views")
app.set("view engine","pug")

clientRoutes(app);
app.get("*",(req: Request,res:Response)=>{ // tất cả các route không giống ở admin và clint 
    res.render("./client/pages/error/404.pug",{
      pageTitle: "lỗi"
    })
  })

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})