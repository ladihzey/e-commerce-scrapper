import { Product } from "./product";

export interface Module {
    getProducts(searchTerm: string, amount: number): Promise<Product[]>;
    name: string;
}
