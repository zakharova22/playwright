const crypto = require ('crypto')
export async function getRandomNumber() {
    return Math.floor(Math.random() * 1000 + 1 )
}

export async function getRandomString() {
    return crypto.randomBytes(20).toString('hex')
}
