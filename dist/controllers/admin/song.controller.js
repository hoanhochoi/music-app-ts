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
exports.editPatch = exports.edit = exports.changeMulti = exports.changeStatus = exports.createPost = exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../model/song.model"));
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const countSong = yield song_model_1.default.countDocuments({
        deleted: false,
    });
    let initPagination = {
        currentPage: 1,
        limitItems: 2,
    };
    const objectPagination = (0, pagination_1.default)(initPagination, req.query, countSong);
    const songs = yield song_model_1.default.find({
        deleted: false,
    }).limit(objectPagination.limitItems).skip(objectPagination.skip);
    const newSongs = songs.forEach(item => {
        if (item.status == "active") {
            item["trangThai"] = "Hoạt động";
        }
        else {
            item["trangThai"] = "Dừng hoạt động";
        }
    });
    res.render("./admin/pages/songs/index.pug", {
        pageTitle: "Quản lý bài hát",
        songs: songs,
        pagination: objectPagination,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("fullName");
    res.render("./admin/pages/songs/create", {
        pageTitle: "Thêm mới bài hát",
        topics: topics,
        singers: singers,
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    let audio = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        audio = req.body.audio[0];
    }
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar,
        audio: audio,
        lyrics: req.body.lyrics
    };
    const newsong = new song_model_1.default(dataSong);
    newsong.save();
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/songs`);
});
exports.createPost = createPost;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.status;
    const id = req.params.id;
    yield song_model_1.default.updateOne({
        _id: id
    }, {
        status: status
    });
    console.log(status);
    console.log(id);
    res.redirect("back");
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids.split(", ");
    const type = req.body.type;
    const updatedAt = new Date();
    console.log(type);
    console.log(ids);
    switch (type) {
        case "active":
            yield song_model_1.default.updateMany({ _id: { $in: ids } }, { status: "active", updatedAt: updatedAt });
            break;
        case "inactive":
            yield song_model_1.default.updateMany({ _id: { $in: ids } }, { status: "inactive", updatedAt: updatedAt });
            break;
        default:
            break;
    }
    res.redirect("back");
});
exports.changeMulti = changeMulti;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const song = yield song_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    const topics = yield topic_model_1.default.find({
        deleted: false,
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
    }).select("fullName");
    res.render("admin/pages/songs/edit.pug", {
        pageTitle: "Chỉnh sửa bài hát",
        song: song,
        singers: singers,
        topics: topics
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const id = req.params.id;
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics: req.body.lyrics
    };
    if (req.body.avatar) {
        req.body.avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        req.body.audio = req.body.audio[0];
    }
    yield song_model_1.default.updateOne({ _id: id }, dataSong);
    res.redirect(`back`);
});
exports.editPatch = editPatch;
