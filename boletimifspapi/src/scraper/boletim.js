const CONFIG = require('../config');

exports.obterSemestres = async (page, prontuario) => {
    const url = CONFIG.SUAP.BOLETIM.URL
        .replace(/{{PRONTUARIO}}/, prontuario.toUpperCase())

    await page.goto(url);

    return page.$$eval(CONFIG.SUAP.BOLETIM.SELECTOR.SEMESTRES, getSemestres);
}

exports.obterBoletim = async (page, prontuario, semestre) => {
    const url = CONFIG.SUAP.BOLETIM.URL
        .replace(/{{PRONTUARIO}}/, prontuario.toUpperCase())
        .concat(CONFIG.SUAP.BOLETIM.QUERY_PERIODO.replace(/{{SEMESTRE}}/, semestre));

    await page.goto(url);

    const columns = await getColumnsIndex(page);

    return {
        semestre: semestre,
        disciplinas: columns ? await page.$$eval(CONFIG.SUAP.BOLETIM.SELECTOR.DISCIPLINAS, getDisciplinas, columns) : [] //Se o header da tabela não existe, então não há disciplinas
    };
}

exports.obterDetalhesDisciplina = async (page, id, linkDetalhes) => {
    await page.goto(linkDetalhes);

    const COLUMNS = CONFIG.SUAP.DISCIPLINA.SELECTOR.TABLE_COLUMN;
    return {
        id: id,
        notas: await page.$$eval(CONFIG.SUAP.DISCIPLINA.SELECTOR.TABLE_LINES, getNotasDisciplina, COLUMNS)
    }
}

async function getColumnsIndex(page) {
    const columns = CONFIG.SUAP.BOLETIM.SELECTOR.TABLE_COLUMN;
    const columnsIndex = {};
    
    const columnNames = await page.$$eval(CONFIG.SUAP.BOLETIM.SELECTOR.TABLE_HEADER, el => { 
        const names = [];    
        el.forEach(x => { 
            for(let i = 0; i < x.colSpan; i++) // Igualar a quantidade de colunas do header com a quantidade de colunas do body da table
                names.push(x.textContent);
        }); 

        return names;
    });

    if(columnNames.length == 0)
        return null;

    columnNames.

    for(key in CONFIG.SUAP.BOLETIM.SELECTOR.TABLE_COLUMN)
        columnsIndex[key] = columnNames.indexOf(columns[key]);

    return columnsIndex;
}

function getSemestres(el) {
    if (!el)
        return [];
        
    return el.map(x => {
        return {
            id: x.value,
            nome: x.innerText,
        }
    });
}

function getDisciplinas(el, columns) {
    if (!el)
        return [];

    return el.map(x => x.children).map(x => {
        return {
            id: x[columns.ID].innerText,
            nome: x[columns.NOME].innerText,
            frequencia: x[columns.FREQUENCIA].innerText,
            faltas: x[columns.FALTAS].innerText,
            media: x[columns.MEDIA].innerText,
            linkDetalhes: x[columns.LINK_DETALHES].getElementsByTagName("a")[0].href
        }
    });
}

function getNotasDisciplina(el, COLUMNS) {
    if (!el)
        return [];
        
    return el.map(x => x.children).map(x => {
        return {
            sigla: x[COLUMNS.SIGLA].innerText,
            tipo: x[COLUMNS.TIPO].innerText,
            descricao: x[COLUMNS.DESCRICAO].innerText,
            data: x[COLUMNS.DATA].innerText,
            peso: x[COLUMNS.PESO].innerText,
            nota: x[COLUMNS.NOTA].innerText
        }
    });
}