import { chromium } from "playwright";
import { SimanProduct } from "./core/model/simanProduct";
import { config } from "./scrapingTargetConfig";
import { getProductSku, printProduct } from "./utils/scrapingUtils";

export class App {

    async getProductData() {
        const browser = await chromium.launch({headless: true});
        const page = await  browser.newPage();

        console.log("navigating to ", config.parentUrl);

        await page.goto(config.parentUrl + '/calzado');

        console.log("waiting  for ", config.productClassContainer);

        await page.waitForSelector(config.productClassContainer);

        console.log("finished waiting for ", config.productClassContainer);

        // code running on the browser
        const items : Array<SimanProduct>  = await page.$$eval(config.productClassContainer, elements => {
            const items = elements.map(el => {
                const brandName = el.querySelector('.brand-name');
                const productName = el.querySelector('.product-name');
                const productLink = el.querySelector('a')
                const product : SimanProduct = {
                    detailLink: productLink ? productLink.href : "",
                    name: productName ? productName.textContent : "",
                    brandName: brandName ? brandName.textContent : "",
                    sku: ""
                }
                return product;
            });

            return items;

        });

        console.log("We are at items now");

        for (let product of items) {
            product.sku = getProductSku(product.detailLink);
            printProduct(product);
        }
    
        await page.close();
        await browser.close();

    }

}

const app = new App();

app.getProductData();