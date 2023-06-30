import { Nullable } from "@/common/types/nullable";

const priceRE = /(\$)(\d+\.\d+)/;

interface Price {
    currency: Nullable<string>,
    price: Nullable<number>,
}

class PriceParser {
    parse(text: string): Price {
        const matches = text?.match(priceRE);
        const currency = matches?.[1];

        const priceMatch = matches?.[2];
        const price = priceMatch ?parseFloat(priceMatch) : null;

        return {
            currency,
            price,
        };
    }
}

export const priceParser = new PriceParser();
