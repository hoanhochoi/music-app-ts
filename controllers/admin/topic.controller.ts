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
    for (const item of topics) {
        if(item.status == "active")
            item["TT"] = 1
        else
            item["tt"] =2
    }
    console.log(topics)
    res.render("admin/pages/topics/index",{
        pageTitle: "Quản lý chủ đề",
        topics: topics,
        pagination: objectPagination
    })
}

// [PATCH] admin/topics/change-status/:status/:id
export const changeStatus = async (req: Request, res: Response)=>{
    const status = req.params.status;
    const id = req.params.id;
    console.log(status,id)
    await Topic.updateOne({_id:id},{status:status})
    res.redirect("back")
}