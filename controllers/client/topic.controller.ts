import {Response, Request} from "express"
import Topic from "../../model/topic.model"

// [GET] topics
export const  topics = async (req: Request, res: Response)=>{
    const topics = await Topic.find({
        deleted: false,
        status: "active"  
    })
    // console.log(topics)
    
    res.render("client/pages/topics/index",{
        pageTitle: "chủ đề bài hát",
        toppics: topics
    })
}