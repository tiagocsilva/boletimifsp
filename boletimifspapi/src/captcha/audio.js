const fs = require("fs");
const request = require("request");
const linear16 = require('linear16');

// Responsável por baixar e transformar o áudio em um formato acessível para a transcrição
exports.getAudioTransformado = async (audioUrl) => {
    const filename = await downloadAudio(audioUrl);
    const newAudio = await transformarAudio(filename);
    fs.unlinkSync(filename); // Deletar audio baixado

    return newAudio;
}

async function downloadAudio(url) {
    return new Promise((resolve) => {
        const audioName = `${new Date().getTime()}.mp3`;

        request.head(url, () => {
            request(url)
                .pipe(fs.createWriteStream(audioName))
                .on('close', () => resolve(audioName));
        });
    });
}

async function transformarAudio(audioName) {
    const newName = `${new Date().getTime()}.wav`;
    await linear16(audioName, newName)
    return newName;
}