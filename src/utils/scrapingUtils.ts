import { SimanProduct } from "../core/model/simanProduct";


export function printProduct(product: SimanProduct) {
    console.log('------- Product Data -------')
    console.log(`Product Name: ${product.name}`);
    console.log(`Product Link: ${product.detailLink}`);
    console.log(`Product Brand: ${product.brandName}`);
    console.log(`Product Sku: ${product.sku}`);
    console.log('----------------------------')
}

export function getProductSku(link: String | null) {

    if (link === null) {
        throw new Error("Link is null");
    }

    const tokens = link.split('-');
    const skuPart = tokens[tokens.length - 1].split('/')[0];

    return skuPart;
}