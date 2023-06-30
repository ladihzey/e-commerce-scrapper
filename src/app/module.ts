import { Product } from "./product";

export interface Module {
    getProducts(searchTerm: string): Promise<Product[]>;
    name: string;
}
