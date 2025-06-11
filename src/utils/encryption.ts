import cryptoJs from "crypto-js";

const { ENCRYPTION_SECRET_KEY: secret = "super_secret_secret" } = process.env;

const decrypt = (encryptedText: string): string =>
  cryptoJs.AES.decrypt(encryptedText, secret).toString(cryptoJs.enc.Utf8);

const encrypt = (text: string): string =>
  cryptoJs.AES.encrypt(text, secret).toString();

export { decrypt, encrypt };
