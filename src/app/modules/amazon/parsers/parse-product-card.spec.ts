import { loadSnapshot } from "@/common/utils/load-snapshot";
import { parseProductCard } from './parse-product-card';

describe.each([
    {
        page: loadSnapshot('amazon/card-1.html'),
        expected: {
            id: 'B083V534DK',
            priceText: '$0.59',
            title: `Andongnywell Women's Ripped Boyfriend Jeans High Waist Skinny Stretch Denim Jean Destroyed Distressed Lift Jeggings `,
            uri: '/Andongnywell-Boyfriend-Destroyed-Distressed-Jeggings/dp/B083V534DK/ref=sr_1_1?keywords=female+jeans&qid=1688152739&sr=8-1',
        },
    },
    {
        page: loadSnapshot('amazon/card-2.html'),
        expected: {
            id: 'B01M6CY4TK',
            priceText: '$12.95',
            title: `Funko POP Anime: Naruto Shippuden (Rasengan) Toy Figure, Multicolor, Standard `,
            uri: '/Funko-POP-Anime-Shippuden-Rasengan/dp/B01M6CY4TK/ref=sr_1_1?keywords=naruto+uzumaki+figure&qid=1688154236&sr=8-1',
        },
    },
    {
        page: loadSnapshot('amazon/card-3.html'),
        expected: {
            id: 'B0C5JFKWH4',
            priceText: '$1.72',
            title: `Long Cardigan for Men Hoodie Fashion Men's Kimono Cardigan Top Shirt Oversize Shirts Popular Pattern Printed `,
            uri: '/Cardigan-Fashion-Oversize-Popular-Pattern/dp/B0C5JFKWH4/ref=sr_1_1?keywords=male+hoodie&qid=1688154549&sr=8-1',
        },
    },
])('card %#)', ({ page, expected }) => {
    it('should parse raw html info', () => {
        const rawInfo = parseProductCard(page);
        console.dir(rawInfo);
        expect(rawInfo).toStrictEqual(expected);
    });
});
