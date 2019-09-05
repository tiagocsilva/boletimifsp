const CONFIG = require("../config");
const scraper = require('../scraper');
const util = require('../util');

module.exports = async (client) => {
    let browser = null, page = null;

    const startEngine = () => {
        return new Promise(async (resolve, reject) => {
            browser = await scraper.createBrowser();
            page = await scraper.newPage(browser, true);
            await scraper.acessarPaginaLogin(page);

            if (CONFIG.MANUTENCAO || await scraper.verificarManutencao(page)) {
                client.emit("manutencao", CONFIG.SUAP.MANUTENCAO.MENSAGEM_APP);
                reject("Manutencao");
            }
            else
                resolve("Ok");
        });
    }

    let pageReady = startEngine();

    client.on("login", async (credentials) => {

        if (util.isEmpty([credentials.prontuario, credentials.senha])) {
            client.emit("login", {
                success: false,
                erro: CONFIG.SUAP.LOGIN.MENSAGEM_VAZIO
            });
            return;
        }

        pageReady.then(async () => {
            const loginResult = await scraper.login(page, credentials.prontuario, credentials.senha);
            client.emit("login", { ...loginResult, credentials: credentials });

            if (loginResult.success) {
                const semestres = await scraper.obterSemestres(page, credentials.prontuario);
                client.emit("semestres", semestres);

                let boletim = {};
                // Pegar o último semestre com disciplinas disponíveis
                for (let i = 0; i < semestres.length; i++) {
                    boletim = await scraper.obterBoletim(page, credentials.prontuario, semestres[i].id);
                    if (boletim.disciplinas.length > 0)
                        break;
                }
                client.emit("boletim", boletim);
                buscarDetalhes(boletim.disciplinas);
            }
        });
    });

    client.on('buscarSemestre', async (semestre, credentials) => {

        // Se a sessão já possui um browser aberto reaproveita, caso contrário cria outro
        if (browser && browser.isConnected())
            browser.idle = false;
        else
            pageReady = startEngine();

        pageReady.then(async () => {

            // Se o usuário perder a conexão e tiver que logar novamente
            if (!await page.url().includes(CONFIG.SUAP.BOLETIM.QUERY_BOLETIM))
                await scraper.login(page, credentials.prontuario, credentials.senha);

            const boletim = await scraper.obterBoletim(page, credentials.prontuario, semestre);
            client.emit("boletim", boletim);
            buscarDetalhes(boletim.disciplinas);
        });
    })

    const buscarDetalhes = async (disciplinas) => {
        const emitirDetalhes = async (disciplina) => {
            const p = await scraper.newPage(browser);
            const detalhes = await scraper.obterDetalhesDisciplina(p, disciplina.id, disciplina.linkDetalhes);
            client.emit("disciplina", detalhes);
            await p.close();
        }

        await Promise.all(disciplinas.map(disciplina => emitirDetalhes(disciplina))).then(() => {
            browser.idle = true;
        });
    }

    client.on('logout', async () => {
        await browser.close();
        pageReady = startEngine();
    });

    client.on('disconnect', async () => {
        await scraper.closeBrowser(browser);
    });
}