import express,{Express,Request, Response} from "express"
import { ppid } from "process";

const app: Express = express();
const port: Number = 3000;
app.get("/topics",(req: Request, res: Response)=>{
    res.send("chủ đề bài hát");
})

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})