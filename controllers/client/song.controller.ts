import {Response, Request} from "express";
import Song from "../../model/song.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";
import FavoriteSong from "../../model/favorite-song.model";

// [GET] /songs/:slugTopic
export const list = async (req:Request,res:Response)=>{
try {
    const topic = await Topic.findOne({
        slug: req.params.slugTopic,
        status: "active",
        deleted: false,
    })
    // console.log(topic)
    const songs = await Song.find({
        topicId: topic.id,
        status: "active",
        deleted: false
    }).select("avatar title slug singerId like")
    // console.log(songs)
    for (let song of songs) {
        const infoSinger = await Singer.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        })
        song["infoSinger"] = infoSinger;
    }
    console.log(songs)
    res.render('client/pages/songs/list.pug',{
        pageTitle: topic.title,
        songs: songs
    })
} catch (error) {
    res.render("client/pages/error/404.pug")
}
}

// [GET] /songs/detail/:slug
export const detail = async (req: Request,res: Response)=>{
    console.log(req.params.slugSong)
    const slug:String = req.params.slugSong;
    const song = await Song.findOne({
        slug: slug,
        status: "active",
        deleted: false
    })
    const singer = await Singer.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false
    }).select("fullName")
    const topic = await Topic.findOne({
        _id: song.topicId,
        status: 'active',
        deleted: false
    })
    const favorite = await FavoriteSong.findOne({
        // userId: ""
        songId: song.id
    })
    console.log("oke")
    song["isFavorite"] = favorite ? true: false;
    // console.log(singer)
    // console.log(song);
    // console.log(topic);
    res.render("client/pages/songs/detail.pug",{
        pageTitle: "bài hát",
        song: song,
        singer: singer,
        topic: topic
    })
}

// [GET] /songs/like/:typeLike/:id
export const like = async (req: Request,res: Response)=>{
    // 670be6be05b8c4632431affc
    const typeLike = req.params.typeLike;
    const id = req.params.id;
    const song = await Song.findOne({
        _id: id,
        status: "active",
        deleted: false  
    })
    let newLike: number = typeLike == "like" ? song.like + 1 : song.like -1;
    await Song.updateOne({
        _id:id
    },{
        like: newLike
    })
    res.json({
        code: 200,
        message: "thành công",
        like : newLike
    })
}

export const favorite = async(req: Request, res: Response)=>{
    const typeFavorite = req.params.typeFavorite;
    const id = req.params.id;
    switch(typeFavorite){
        case "favorite":
            console.log("có")
            const record = await FavoriteSong.findOne({
                songId: id,
            })
            if(!record){
                const favorite = new FavoriteSong({
                    // user : ""
                    songId: id,
                })
                await favorite.save()
            }
            break;
        case "unfavorite":
            console.log("không")
            await FavoriteSong.deleteOne({
                songId: id
            })
            break;
        default:
            console.log("không có")
    }
    res.json({
        code: 200,
        message: "thành công!"
    })
}