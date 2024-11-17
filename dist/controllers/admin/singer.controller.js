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
exports.createPost = exports.create = exports.index = void 0;
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singers = yield singer_model_1.default.find({
        deleted: false,
    }).select("-slug");
    console.log(singers);
    res.render("./admin/pages/singers/index.pug", {
        pageTitile: "Quản lý ca sĩ",
        singers: singers,
    });
});
exports.index = index;
const create = (req, res) => {
    res.render("./admin/pages/singers/create.pug", {
        pageTitle: "Thêm mới ca sĩ"
    });
};
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    const dataSinger = {
        fullName: req.body.fullName,
        description: req.body.description,
        avatar: avatar,
        status: req.body.status
    };
    const newSinger = new singer_model_1.default(dataSinger);
    console.log(newSinger);
    newSinger.save();
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
});
exports.createPost = createPost;
