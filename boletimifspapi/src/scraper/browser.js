const CONFIG = require("../config");
const puppeteer = require('puppeteer');

const browsers = [];

exports.browsers = browsers;

exports.create = async () => {

    if (browsers.length >= CONFIG.MAX_BROWSERS_OPEN) {
        // Finalizar um browser ocioso para liberar memória
        const idleBrowser = browsers.find(x => x.idle);

        if (idleBrowser) {
            idleBrowser.close();
            browsers.splice(browsers.indexOf(idleBrowser), 1);
        }
    }

    const browser = await puppeteer.launch({ timeout: 100000, headless: CONFIG.HEADLESS_BROWSER });
    browsers.push(browser);
    return browser;
};

exports.close = async (browser) => {
    const index = browsers.indexOf(browser) != -1;
    if (index > -1)
        browsers.splice(index, 1);

    await browser.close();
}