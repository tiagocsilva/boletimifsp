const _ENVIRONMENTS = {
    DEVELOPMENT: {
        SOCKET_URL: 'http://boletimifsp.ddns.net:8080'
    },
    PRODUCTION: {
        SOCKET_URL: 'http://boletimifsp.ddns.net:8080'
    }
}

const CONFIG = {
    COLORS: {
        BACKGROUND: '#48C56F'
    }
}

function getConfig() {
    if (__DEV__)
        return { ..._ENVIRONMENTS.DEVELOPMENT, ...CONFIG }
    else
        return { ..._ENVIRONMENTS.PRODUCTION, ...CONFIG }
}

export default getConfig();