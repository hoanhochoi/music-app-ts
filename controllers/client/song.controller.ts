import {Response, Request} from "express";
import Song from "../../model/song.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";

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
    console.log(singer)
    console.log(song);
    console.log(topic);
    res.render("client/pages/songs/detail.pug",{
        pageTitle: "bài hát",
        song: song,
        singer: singer,
        topic: topic
    })
}