import {Response,Request} from "express";
import Topic from "../../model/topic.model";

// [GET] /admin/topics
export const index = async (req:Request,res: Response)=>{
    const topics = await Topic.find({
        deleted: false,
    });
    console.log(topics);
    res.render("admin/pages/topics/index",{
        pageTitle: "Quản lý chủ đề",
        topics: topics,
    })
}