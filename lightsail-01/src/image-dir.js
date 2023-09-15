const path = require('path')

const IMAGE_DIR = process.env.IMAGE_DIR || '/var/image-app/images'

function getLocalImageDir(environment) {
    if (environment === 'dev') return path.join(__dirname, '..', 'dev-image-dir')
    else return IMAGE_DIR
}

module.exports = getLocalImageDir