const CONFIG = require("../config");
const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const speechConfig = sdk.SpeechConfig.fromSubscription(CONFIG.COGNITIVE.SUBSCRIPTION_KEY, CONFIG.COGNITIVE.SERVICE_REGION);
speechConfig.speechRecognitionLanguage = CONFIG.COGNITIVE.SPEECH_RECOGNITION_LANGUAGE;

// Responsável por converter o áudio em texto
exports.getAudioText = (filename) => new Promise((resolve, reject) => {
    const pushStream = sdk.AudioInputStream.createPushStream();
    fs.createReadStream(filename).on('data', function (arrayBuffer) {
        pushStream.write(arrayBuffer.buffer);
    }).on('end', function () {
        pushStream.close();
    });

    const recognizer = new sdk.SpeechRecognizer(speechConfig, sdk.AudioConfig.fromStreamInput(pushStream));
    recognizer.recognizeOnceAsync(
        (result) => {
            recognizer.close();
            resolve(result.privText);
        },
        () => {
            recognizer.close();
            reject();
        }
    );
});
