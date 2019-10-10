"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pagination {
    constructor(data, count, total, pages, next, previous) {
        this.data = data;
        this.count = count;
        this.total = total;
        this.pages = pages;
        this.next = next;
        this.previous = previous;
    }
}
exports.Pagination = Pagination;
