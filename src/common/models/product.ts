export class Product {
    readonly createdAt: Date = new Date();

    constructor(
        readonly platform: string,
        readonly platformId: string,
        readonly searchTerm: string,
        readonly title: string,
        readonly currency: string,
        readonly price: number,
        readonly url: string,
    ) {}
}
