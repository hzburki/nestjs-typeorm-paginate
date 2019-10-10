export declare class Pagination<PaginationObject> {
    readonly data: PaginationObject[];
    readonly count: number;
    readonly total: number;
    readonly pages: number;
    readonly next?: string;
    readonly previous?: string;
    constructor(data: PaginationObject[], count: number, total: number, pages: number, next?: string, previous?: string);
}
