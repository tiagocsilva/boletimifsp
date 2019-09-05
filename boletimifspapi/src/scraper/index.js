const CONFIG = require("../config");
const util = require("../util");
const browser = require("./browser");
const login = require("./login");
const boletim = require("./boletim");
const captcha = require("../captcha");

exports.createBrowser = () => browser.create();

exports.closeBrowser = (currentBrowser) => browser.close(currentBrowser);

exports.newPage = async (browser, hasCaptcha) => {
    if (hasCaptcha)
        captcha.getCaptchaResponse();

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    return page;
};

exports.acessarPaginaLogin = async (page) => login.acessarPagina(page);

//Verifica se o SUAP está em mauntenção no momento
exports.verificarManutencao = async (page) => {
    const elm = await page.$(CONFIG.SUAP.MANUTENCAO.SELECTOR);
    return elm !== null && await util.getElementText(page, elm) == CONFIG.SUAP.MANUTENCAO.CONTENT;
}

exports.login = async (page, prontuario, senha) => {
    await captcha.injectCaptchaResponse(page);
    const loginResult = await login.logarNoSuap(page, prontuario, senha);

    // Se o usuário errou a senha ou coisa do gênero deve-se resolver o captcha novamente
    if (!loginResult.success)
        captcha.getCaptchaResponse();

    return loginResult;
};

exports.obterSemestres = async (page, prontuario) => {
    return boletim.obterSemestres(page, prontuario);
}

exports.obterBoletim = async (page, prontuario, semestre) => {
    const boletimResult = await boletim.obterBoletim(page, prontuario, semestre);

    boletim.disciplinas = boletimResult.disciplinas.map(x => {

        try {
            x.sigla = obterSiglaDisciplina(x.nome);

            if (x.sigla) {
                // Remover o número da disciplina ex: (SUP.XXXXX)
                x.nome = x.nome.slice(x.nome.indexOf(x.sigla) + x.sigla.length + 4).toUpperCase();;

                // Adicionar sigla na frente do nome
                x.nome = x.sigla + " - " + x.nome;
            }
            else
                x.sigla = x.nome.substring(0, 8)
        } catch (e) {
            x.sigla = x.nome;
            // Se der ruim, retorna o restante dos dados intáctos...
        }

        return x;
    });

    return boletimResult;
}

exports.obterDetalhesDisciplina = async (page, id, link) => {
    return boletim.obterDetalhesDisciplina(page, id, link);
}

function obterSiglaDisciplina(nome) {
    const posicao = nome.indexOf('(');
    if (posicao != -1) {
        const finalSigla = nome.indexOf(')');
        return nome.substring(posicao + 1, finalSigla)
    }

    return null;
}