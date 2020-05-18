const crypto = require('crypto');

//TODO to change before production
const algorithm = process.env.encryptSecret || 'aes192';
const password = 'abcdefghijklmnopqrstuvwxyz';

module.exports = {
    name: 'encrypt',
    val: {
        encode: (payload) => {
            //encrypt any object given to it
            const cipher = crypto.createCipher(algorithm, password);
            let encrypted = cipher.update(payload, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        },
        decode: (payload) => {
            //decrypt object
            try {
                const decipher = crypto.createDecipher(algorithm, password);
                let decrypted = decipher.update(payload, 'hex', 'utf8');
                decrypted += decipher.final('utf8');
                return JSON.parse(decrypted);
            } catch(err) {
                return {};
            }
        }
    }
}