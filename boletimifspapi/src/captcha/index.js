const CONFIG = require("../config");
const scraper = require("./scraper");
const audio = require("./audio");
const cognitive = require("./cognitive");
const fs = require("fs");

// Quantidade de tokens que o serviço deve buscar, para cada usuário fazendo login é incrementado 1 token
let requestsToken = 0;

// Sessões aguardando apenas o token para dar sequencia ao login
const waitingToken = [];

// Tokens adquiridos
const tokens = [];

exports.injectCaptchaResponse = async (page) => {
    await waitToken().then(async (token) => await page.$eval(CONFIG.CAPTCHA.RESPONSE_SELECTOR, (el, token) => el.value = token, token));
}

exports.getCaptchaResponse = async () => {
    requestsToken++;

    // Se essa é a primeira requisição, então o scraper está ocioso, sendo assim podemos mandar trabalho para ele
    if (requestsToken == 1)
        await solveCaptcha();
}

function waitToken() {
    return new Promise(resolve => {

        let token = null;
        while (!token && tokens.length > 0) {
            token = extractFirstToken();

            // Verificar se o token está válido (105s)
            if (new Date().getTime() - token.datetime.getTime() > 105000)
                token = null;
        }

        if (token)
            return resolve(token.response);
        else if (waitingToken > requestsToken)
            this.getCaptchaResponse();

        const objWait = {
            resolved: false
        }

        waitingToken.push(objWait);

        const interval = setInterval(() => {
            if (objWait.resolved) {
                // Remover da fila de espera
                const index = waitingToken.indexOf(objWait);
                waitingToken.splice(index, 1);

                clearInterval(interval);
                return resolve(extractFirstToken().response);
            }
        }, 300);
    });
}

function extractFirstToken() {
    const token = tokens.splice(0, 1);
    return token[0];
}

async function solveCaptcha(outraTentativa) {
    try {
        const audioUrl = await scraper.obterUrlAudio(outraTentativa);
        const filename = await audio.getAudioTransformado(audioUrl);
        const audioText = await cognitive.getAudioText(filename);
        fs.unlinkSync(filename); // Deletar o aúdio que não será mais usado

        let captchaResponse = await scraper.obterCaptchaResponse(audioText);

        // Se o CAPTCHA response for inváldo, tenta novamente
        if (captchaResponse && captchaResponse.length > 0) {
            tokens.push({
                response: captchaResponse,
                datetime: new Date()
            });

            if (waitingToken.length > 0)
                waitingToken[0].resolved = true;

            // Liberar página para o próximo captcha-response
            scraper.refreshPage();

            requestsToken--;

            // Continua a obter mais tokens para atender todos os usuários
            if (requestsToken > 0)
                solveCaptcha();
        }
        else
            solveCaptcha(true);
    } catch (e) {
        // Se ocorreu algum erro ao resolver o captcha, reinicia e tenta novamente
        scraper.refreshPage();
        solveCaptcha()
    }
}