const crypto = require('crypto')
const fs = require('fs')

const keys = crypto.generateKeyPairSync("rsa", {
    modulusLength:4096,
    publicKeyEncoding:{
        type:"pkcs1",
        format:"pem"
    },
    privateKeyEncoding:{
        type:"pkcs1",
        format:"pem"
    }
})

fs.writeFileSync(__dirname + "/public.pem", keys.publicKey)
fs.writeFileSync(__dirname + "/private.pem", keys.privateKey)