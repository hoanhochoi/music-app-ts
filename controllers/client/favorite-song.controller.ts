import {Response,Request} from "express"
import FavoriteSong from "../../model/favorite-song.model"
import Singer from "../../model/singer.model"
import Song from "../../model/song.model"

export const index = async (req:Request,res: Response)=>{
    const favoriteSongs = await FavoriteSong.find({
        // user: ""
        deleted: false,
    })
    for (const item of favoriteSongs) {
        const song = await Song.findOne({
            _id: item.songId
        })
        const singer = await Singer.findOne({
            _id: song.singerId,
        }).select("fullName")
       item["infoSong"] = song;
       item["infoSinger"] = singer;
    }
    console.log(favoriteSongs);
    res.render("client/pages/favorite-songs/index.pug",{
        pageTitle: "Bài hát yêu thích",
        favoriteSongs : favoriteSongs,
    })
}