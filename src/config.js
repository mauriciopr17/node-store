global.SALT_KEY = "f5b99242-6504-4ca3-90f2-05e78e57613f";
global.EMAIL_TMPL = "Olá, <strong>{0}</strong>, seja bem vindo a Node Store.";

module.exports = {
  connectionString:
    "mongodb+srv://pereira:pereira@cluster0.eui4y.mongodb.net/Store-Node-Baltaio?retryWrites=true&w=majority",
  sendgridKey:
    "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", //para envio de e-mail
  containerConnectionString: "TBD",
};
