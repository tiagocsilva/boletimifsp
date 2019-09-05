const CONFIG = require("../config");
const robot = require("robotjs");
const clipboardy = require("clipboardy");
const puppeteer = require('puppeteer');
const email = require("../util/email")

let browser = null, page = null, loading = true;

const start = () =>
    new Promise(async resolve => {
        browser = await puppeteer.launch({ headless: false, ignoreDefaultArgs: ['--enable-automation'], args: ['-start-fullscreen'] });
        page = await browser.newPage();
        await page.goto(CONFIG.SUAP.LOGIN.URL);
        resolve();
    });

const ready = () =>
    new Promise(resolve => {
        const interval = setInterval(() => {
            if (!loading) {
                clearInterval(interval);
                resolve();
            }
        }, 300);
    });


start().then(() => loading = false);

exports.obterUrlAudio = async (outraTentativa) => {
    await ready();

    if (!outraTentativa) {
        moveAndClick(CONFIG.CAPTCHA.NAO_SOU_UM_ROBO);
        await page.waitForSelector(CONFIG.CAPTCHA.CONTAINER, { visible: true });

        moveAndClick(CONFIG.CAPTCHA.DESAFIO_AUDIO);
        const ok = await verificarDesafioAudio(page);

        if (!ok) {
            email.send();
            return;
        }
    }

    moveAndClick(CONFIG.CAPTCHA.DOWNLOAD_AUDIO, outraTentativa, 'right');
    await sleep(500);

    moveAndClick(CONFIG.CAPTCHA.COPIAR_URL, outraTentativa);
    await sleep(500);

    return clipboardy.readSync();
}

exports.obterCaptchaResponse = async (text, outraTentativa) => {
    moveAndClick(CONFIG.CAPTCHA.CAIXA_TEXTO, outraTentativa);

    robot.typeString(text && text.length > 0 ? text : "...");
    robot.keyTap("enter");

    await sleep(2000);

    return page.$eval(CONFIG.CAPTCHA.RESPONSE_SELECTOR, el => el.value);
}

exports.refreshPage = async () => {
    loading = true;
    await page.reload();
    loading = false;
}

function moveAndClick(coordinates, outraTentativa, button = 'left') {
    robot.moveMouse(coordinates.x, coordinates.y + (outraTentativa ? CONFIG.CAPTCHA.OUTRA_TENTATIVA_ESPACO : 0));
    robot.mouseClick(button);
}

async function verificarDesafioAudio(page) {
    const divCaptcha = `${CONFIG.CAPTCHA.CONTAINER} > div:last-child`;

    await page.waitFor((divCaptcha, widthOk, widthBlock) => {
        const elm = document.querySelector(divCaptcha);

        if (!elm)
            return false;

        const width = elm.style.width;
        return width == widthOk || width == widthBlock;
    }, {}, divCaptcha, CONFIG.CAPTCHA.WIDTH_OK, CONFIG.CAPTCHA.WIDTH_BLOCKED);

    const width = await page.$eval(divCaptcha, el => el.style.width);

    // Retorna true se estiver tudo OK ou false se o IP foi bloqueado
    return !(width == CONFIG.CAPTCHA.WIDTH_BLOCKED);
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => { resolve() }, ms);
    });
}