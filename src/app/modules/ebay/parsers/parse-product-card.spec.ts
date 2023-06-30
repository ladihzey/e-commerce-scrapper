import { loadSnapshot } from "@/common/utils/load-snapshot";
import { parseProductCard } from './parse-product-card';

describe.each([
    {
        page: loadSnapshot('ebay/card-1.html'),
        expected: {
            id: 'item28e85bb882',
            priceText: '$13.99',
            title: `1/12 Female Blue Jeans Trousers Clothes For 6\" TBL PH Action Figure Body Toys`,
            url: 'https://www.ebay.com/itm/175697016962?hash=item28e85bb882:g:6NMAAOSwaxpkQjns&amdata=enc%3AAQAIAAAAwC33zVfK7QIzi84RcJ%2FZgnNDwZ8aQx%2FsWyIBKPFofVA5t7lalo8QtNi34GBJOnM7zxioCvF1Jku26UuhA48DyezzBrvImQO5gkPZ%2BSKiJBkIKDEy3Xjt9IBlA6vJxg0IMmtcaeLUW16q%2F%2BG0vSucAoxlSRA%2FsaKQwidpV2EH9j8tQGw6KpUcG%2B6inycaZmXse7LyBKQvRYfXAIziJoBg%2FK0rLtjRBA1o38R%2FLa1ckEqznbcFRh3tMVOUseyGDIuotQ%3D%3D%7Ctkp%3ABk9SR67c_tuhYg',
        },
    },
    {
        page: loadSnapshot('ebay/card-2.html'),
        expected: {
            id: 'item59ce767ac7',
            priceText: '$1.29',
            title: `Naruto Action Figure Anime Naruto Uzumaki Doll Shippuden Statue Gift Toy`,
            url: 'https://www.ebay.com/itm/385715960519?hash=item59ce767ac7:g:2csAAOSwR6xkjIxg&amdata=enc%3AAQAIAAAA8KMFIRAT1jeN%2FpqaoI7lk8IQ1xfB2fcGOhEzDkoScueySUzLoLj7sDyMfa5WCLRVAPBTa4ZXtLNGB3lQ2HiNEF4Omhxaa14XqQPQvmCEy0%2FCMArR3sKL5j1JCbYoFZ7VFdRfR4H7dCmpa6%2Fznw1FqsH%2FLBOU5MG0IWpyjQosFE0IcVvk9KkO%2BW0qVRcPcjnNVokVFhJTScTbEfRerSX7F%2FWItRO4Nb1fise8ajhOUXMjoQWoShuM4vgAWZ35DXflwYUZgr1C0wfx5FBWUNnVJLURuxHH3uRMsksN2kf9KugcaVZgVUSLTdF6uhGbTD%2F%2BYA%3D%3D%7Ctkp%3ABk9SR6Dov92hYg',
        },
    },
    {
        page: loadSnapshot('ebay/card-3.html'),
        expected: {
            id: 'item52944b9a1c',
            priceText: '$18.29',
            title: `Male 1/6 Scale Solid Color Hoodie Jacket Clothes Model Fit 12'' Soldier Body`,
            url: 'https://www.ebay.com/itm/354675300892?hash=item52944b9a1c:g:2qAAAOSwq9dkHrCO&amdata=enc%3AAQAIAAAA4APdgx4%2FJA8xeNvxw63o06Yo36woiegmhMJUTNtmA6a4GjePT3nFwBSI0l9BKK3CgHP2RP2Ghj%2BZiW3p7SFWs7hnMHI869vBiniC2qcijqyBSkiD%2Br4b4O4YvHEoEr9PWTCgm10bvafDNZEKheT8Gu6ZKBLmE0382OFCAhLUMYYLuFDsd2fp7knw34wbA8H1wSle5mdebijIVBAMdtlUtOGf6IlBBSYR5ZBBa7SBD2zehlYyLeOswdGMZa9L4efAgd4h5FP7IMrBrsDtklIfaRhESqX0jnhAVkMh%2FjcaSymm%7Ctkp%3ABk9SR8LE192hYg',
        },
    },
])('card %#)', ({ page, expected }) => {
    it('should parse raw html info', () => {
        const rawInfo = parseProductCard(page);
        console.dir(rawInfo);
        expect(rawInfo).toStrictEqual(expected);
    });
});
