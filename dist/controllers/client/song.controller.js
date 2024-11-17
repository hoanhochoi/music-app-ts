"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const song_model_1 = __importDefault(require("../../model/song.model"));
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const favorite_song_model_1 = __importDefault(require("../../model/favorite-song.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topic = yield topic_model_1.default.findOne({
            slug: req.params.slugTopic,
            status: "active",
            deleted: false,
        });
        const songs = yield song_model_1.default.find({
            topicId: topic.id,
            status: "active",
            deleted: false
        }).select("avatar title slug singerId like");
        for (let song of songs) {
            const infoSinger = yield singer_model_1.default.findOne({
                _id: song.singerId,
                status: "active",
                deleted: false
            });
            song["infoSinger"] = infoSinger;
        }
        console.log(songs);
        res.render('client/pages/songs/list.pug', {
            pageTitle: topic.title,
            songs: songs
        });
    }
    catch (error) {
        res.render("client/pages/error/404.pug");
    }
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.slugSong);
    const slug = req.params.slugSong;
    const song = yield song_model_1.default.findOne({
        slug: slug,
        status: "active",
        deleted: false
    });
    const singer = yield singer_model_1.default.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false
    }).select("fullName");
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId,
        status: 'active',
        deleted: false
    });
    const favorite = yield favorite_song_model_1.default.findOne({
        songId: song.id
    });
    console.log("oke");
    song["isFavorite"] = favorite ? true : false;
    res.render("client/pages/songs/detail.pug", {
        pageTitle: "bài hát",
        song: song,
        singer: singer,
        topic: topic
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const typeLike = req.params.typeLike;
    const id = req.params.id;
    const song = yield song_model_1.default.findOne({
        _id: id,
        status: "active",
        deleted: false
    });
    let newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
    yield song_model_1.default.updateOne({
        _id: id
    }, {
        like: newLike
    });
    res.json({
        code: 200,
        message: "thành công",
        like: newLike
    });
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const typeFavorite = req.params.typeFavorite;
    const id = req.params.id;
    switch (typeFavorite) {
        case "favorite":
            console.log("có");
            const record = yield favorite_song_model_1.default.findOne({
                songId: id,
            });
            if (!record) {
                const favorite = new favorite_song_model_1.default({
                    songId: id,
                });
                yield favorite.save();
            }
            break;
        case "unfavorite":
            console.log("không");
            yield favorite_song_model_1.default.deleteOne({
                songId: id
            });
            break;
        default:
            console.log("không có");
    }
    res.json({
        code: 200,
        message: "thành công!"
    });
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.id;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
    });
    let listen = song.listen + 1;
    yield song_model_1.default.updateOne({
        _id: idSong
    }, {
        listen: listen,
    });
    const songNew = yield song_model_1.default.findOne({
        _id: idSong
    });
    res.json({
        code: 200,
        message: "thành công!",
        listen: songNew.listen
    });
});
exports.listen = listen;
