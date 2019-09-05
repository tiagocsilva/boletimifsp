const CONFIG = require('../config');
const util = require('../util');

exports.acessarPagina = (page) => page.goto(CONFIG.SUAP.LOGIN.URL);

exports.logarNoSuap = async (page, prontuario, senha) => {
    await Promise.all([
        setInputText(page, CONFIG.SUAP.LOGIN.SELECTOR.PRONTUARIO, prontuario),
        setInputText(page, CONFIG.SUAP.LOGIN.SELECTOR.SENHA, senha)
    ]);

    await Promise.all([
        page.waitForNavigation(),
        page.click(CONFIG.SUAP.LOGIN.SELECTOR.BUTTON)
    ]);

    return verificarLogin(page);
}

async function verificarLogin(page) {
    const status = {}

    // Se for encontrada a input de login na página, significa que o usuário ainda está na página de login, logo ocorreu algum erro ao tentar logar
    status.success = await page.$(CONFIG.SUAP.LOGIN.SELECTOR.PRONTUARIO) === null;

    if (status.success)
        status.nomeUsuario = await page.$eval(CONFIG.SUAP.BOLETIM.SELECTOR.NOME, el => el.innerText);
    else
        status.erro = await getLoginError(page);

    return status;
}

async function getLoginError(page) {
    const erroProntuario = await page.$(CONFIG.SUAP.LOGIN.SELECTOR.ERRO.PRONTUARIO);

    if (erroProntuario)
        return util.getElementText(page, erroProntuario);
    else {
        const erroGenerico = await page.$(CONFIG.SUAP.LOGIN.SELECTOR.ERRO.GENERICO);
        if (erroGenerico)
            return util.getElementText(page, erroGenerico);
    }
}

function setInputText(page, selector, val) {
    return page.$eval(selector, (el, val) => { el.value = val }, val);
}