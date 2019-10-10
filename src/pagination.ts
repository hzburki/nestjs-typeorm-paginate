export class Pagination<PaginationObject> {
  constructor(
    public readonly data: PaginationObject[],
    public readonly count: number,
    public readonly total: number,
    public readonly pages: number,
    public readonly next?: string,
    public readonly previous?: string
  ) {}
}
