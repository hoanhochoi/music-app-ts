import express,{Express,Request, Response} from "express"
import { ppid } from "process";

const app: Express = express();
const port: Number = 3000;

app.set("views","./views")
app.set("view engine","pug")

app.get("/topics",(req: Request, res: Response)=>{
    res.render("./client/pages/topics/index")
})

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})