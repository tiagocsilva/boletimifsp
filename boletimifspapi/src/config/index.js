module.exports = {
    PORT: process.env.PORT || 8080,
    MANUTENCAO: false,
    HEADLESS_BROWSER: true,
    MAX_BROWSERS_OPEN: 2,
    CAPTCHA: {
        // C0ORDENADAS DEFINIDAS PARA UMA RESOLUÇÃO DE 1366x768
        NAO_SOU_UM_ROBO: {
            x: 116,
            y: 444
        },
        DESAFIO_AUDIO: {
            x: 220,
            y: 560
        },
        DOWNLOAD_AUDIO: {
            x: 282,
            y: 498
        },
        COPIAR_URL: {
            x: 354,
            y: 622
        },
        CAIXA_TEXTO: {
            x: 240,
            y: 440
        },
        OUTRA_TENTATIVA_ESPACO: 15,
        CONTAINER: "body > div:last-child",
        WIDTH_OK: '280px',
        WIDTH_BLOCKED: '300px',
        RESPONSE_SELECTOR: "#g-recaptcha-response"
    },
    EMAIL: {
        HOST: "",
        PORT: 465,
        USER: "",
        PASS: ""
    },
    COGNITIVE: {
        SUBSCRIPTION_KEY: "", // AZURE KEY HERE
        SERVICE_REGION: "southcentralus",
        SPEECH_RECOGNITION_LANGUAGE: "en-US"
    },
    SUAP: {
        MANUTENCAO: {
            SELECTOR: ".transbox h1",
            CONTENT: "Manutenção Programada",
            MENSAGEM_APP: "Estaremos ativos em breve!"
        },
        LOGIN: {
            URL: "https://suap.ifsp.edu.br",
            SELECTOR: {
                PRONTUARIO: "#id_username",
                SENHA: "#id_password",
                BUTTON: "div.submit-row input",
                ERRO: {
                    PRONTUARIO: ".errorlist",
                    GENERICO: ".errornote"
                }
            },
            MENSAGEM_VAZIO: "Por favor, digite seu prontuário e senha"
        },
        BOLETIM: {
            URL: "https://suap.ifsp.edu.br/edu/aluno/{{PRONTUARIO}}/?tab=boletim",
            QUERY_BOLETIM: "tab=boletim",
            QUERY_PERIODO: "&ano_periodo={{SEMESTRE}}",
            SELECTOR: {
                SEMESTRES: '#ano_periodo > option',
                NOME: "#user-tools > a > span",
                DISCIPLINAS: "#tabela_boletim tbody tr",
                TABLE_HEADER: "#tabela_boletim thead tr:nth-child(1) th",
                TABLE_COLUMN: {
                    ID: "Diário",
                    NOME: "Disciplina",
                    FALTAS: "T. Faltas",
                    FREQUENCIA: "% Freq.",
                    MEDIA: "MFD/Conceito",
                    LINK_DETALHES: "Ações"
                }
            }
        },
        DISCIPLINA: {
            SELECTOR: {
                TABLE_LINES: "#content table:nth-child(3) tbody tr",
                TABLE_COLUMN: {
                    SIGLA: 0,
                    TIPO: 1,
                    DESCRICAO: 2,
                    DATA: 3,
                    PESO: 4,
                    NOTA: 5
                }
            }
        }
    }
}