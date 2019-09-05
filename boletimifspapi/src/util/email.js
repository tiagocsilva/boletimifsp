const CONFIG = require("../config");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: CONFIG.EMAIL.HOST,
    port: CONFIG.EMAIL.PORT,
    secure: true,
    auth: {
        user: CONFIG.EMAIL.USER,
        pass: CONFIG.EMAIL.PASS
    }
});

exports.send = async () => {
    await transporter.sendMail({
        from: `"Boletim IFSP 👻" <${CONFIG.EMAIL.USER}>`,
        to: CONFIG.EMAIL.USER,
        subject: "GOOGLE BLOCK ✔",
        text: "Verifique a API do Boletim IFSP, pode ser que tenha sido bloqueada...",
    });
}

exports.notifyStart = async () => {
    await transporter.sendMail({
        from: `"Boletim IFSP 👻" <${CONFIG.EMAIL.USER}>`,
        to: CONFIG.EMAIL.USER,
        subject: "SERVER STARTED ✔",
        text: "O servidor está ativo!",
    });
}