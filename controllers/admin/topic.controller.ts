import {Response,Request} from "express";
import Topic from "../../model/topic.model";
import PaginationHelper from "../../helpers/pagination";

// [GET] /admin/topics
export const index = async (req:Request,res: Response)=>{

    const countTopic = await Topic.countDocuments({
        deleted: false,
    })
    let initPagination = {
        currentPage : 1,
        limitItems: 3,
    }
    const objectPagination = PaginationHelper(initPagination,req.query,countTopic);

    const topics = await Topic.find({
        deleted: false,
    }).limit(objectPagination.limitItems).skip(objectPagination.skip);
    console.log(objectPagination)
    // console.log(topics);
    res.render("admin/pages/topics/index",{
        pageTitle: "Quản lý chủ đề",
        topics: topics,
        pagination: objectPagination
    })
}