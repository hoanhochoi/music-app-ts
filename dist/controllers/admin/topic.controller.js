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
exports.changeStatus = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const countTopic = yield topic_model_1.default.countDocuments({
        deleted: false,
    });
    let initPagination = {
        currentPage: 1,
        limitItems: 3,
    };
    const objectPagination = (0, pagination_1.default)(initPagination, req.query, countTopic);
    const topics = yield topic_model_1.default.find({
        deleted: false,
    }).limit(objectPagination.limitItems).skip(objectPagination.skip);
    for (const item of topics) {
        if (item.status == "active")
            item["TT"] = 1;
        else
            item["tt"] = 2;
    }
    console.log(topics);
    res.render("admin/pages/topics/index", {
        pageTitle: "Quản lý chủ đề",
        topics: topics,
        pagination: objectPagination
    });
});
exports.index = index;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.status;
    const id = req.params.id;
    console.log(status, id);
    yield topic_model_1.default.updateOne({ _id: id }, { status: status });
    res.redirect("back");
});
exports.changeStatus = changeStatus;
