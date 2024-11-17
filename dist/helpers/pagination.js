"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PaginationHelper = (objectPagination, query, countProducts) => {
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    const totalPage = Math.ceil(countProducts / objectPagination.limitItems);
    objectPagination.totalPage = totalPage;
    return objectPagination;
};
exports.default = PaginationHelper;
