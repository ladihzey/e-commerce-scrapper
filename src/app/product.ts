import { Nullable } from "@/common/types/nullable";

export class Product {
    readonly createdAt: Date = new Date();

    constructor(
        readonly platform: string,
        readonly platformId: Nullable<string>,
        readonly searchTerm: string,
        readonly title: Nullable<string>,
        readonly currency: Nullable<string>,
        readonly price: Nullable<number>,
        readonly url: Nullable<string>,
    ) {}
}
