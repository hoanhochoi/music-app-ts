import {Response,Request} from "express";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";
// [GET] topic/:type
export const result = async (req: Request,res: Response)=>{
    const type = req.params.type;
    const keyword :string = `${req.query.keyword}`;
    let newSongs = [];
    if(keyword){
        const keywordRegex = new RegExp(keyword,"i");
        // chuyển chuỗi thành tiếng việt không dấu và "-" ở khoảng trắng
        const stringSlug = convertToSlug(keyword);
        const slugRegex = new RegExp(stringSlug,"i");
        const songs = await Song.find({
            $or: [
                {title: keywordRegex},
                {slug: slugRegex}
            ]   
        })
        for (const item of songs) {
            const infoSinger = await Singer.findOne({
                _id: item.singerId,
            })
            // item["infoSinger"] = infoSinger;
            newSongs.push({
                id: item.id,
                title: item.title,
                avatar: item.avatar,
                like: item.like,
                slug: item.slug,
                infoSinger: {
                    fullName: infoSinger.fullName,
                }
            })
        }
        // newSongs = songs;
    }
    console.log(newSongs);
  
    switch (type) {
        case "result":
            res.render("client/pages/search/result.pug",{
                pageTitle: `kết quả: ${keyword}`,
                keyword: keyword,
                songs: newSongs,
            })
            break;
        case "suggest":
            res.json({
                code: 200,
                songs: newSongs,
            })
            break;
        default:
            break;
    }
}