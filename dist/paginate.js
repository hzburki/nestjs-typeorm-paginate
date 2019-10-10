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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const pagination_1 = require("./pagination");
function paginate(repositoryOrQueryBuilder, options, searchOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        return repositoryOrQueryBuilder instanceof typeorm_1.Repository
            ? paginateRepo(repositoryOrQueryBuilder, options, searchOptions)
            : paginateQueryBuilder(repositoryOrQueryBuilder, options);
    });
}
exports.paginate = paginate;
function createPaginationObject(data, total, page, limit, route) {
    const isNext = route && total / limit >= page + 1;
    const isPrevious = route && page > 0;
    const routes = {
        next: isNext ? `${route}?page=${page + 2}&limit=${limit}` : "",
        previous: isPrevious ? `${route}?page=${page}&limit=${limit}` : ""
    };
    return new pagination_1.Pagination(data, data.length, total, Math.ceil(total / limit), routes.next, routes.previous);
}
function resolveOptions(options) {
    const page = options.page > 0 ? options.page - 1 : options.page < 0 ? 0 : options.page;
    const limit = options.limit;
    const route = options.route;
    return [page, limit, route];
}
function paginateRepo(repository, options, searchOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const [page, limit, route] = resolveOptions(options);
        const [data, total] = yield repository.findAndCount(Object.assign({ skip: page * limit, take: limit }, searchOptions));
        return createPaginationObject(data, total, page, limit, route);
    });
}
function paginateQueryBuilder(queryBuilder, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const [page, limit, route] = resolveOptions(options);
        const [data, total] = yield queryBuilder
            .take(limit)
            .offset(page * limit)
            .getManyAndCount();
        return createPaginationObject(data, total, page, limit, route);
    });
}
