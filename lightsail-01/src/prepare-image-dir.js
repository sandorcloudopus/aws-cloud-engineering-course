const fs = require('fs')

function isDirectoryExists(directoryLocation) {
    return fs.existsSync(directoryLocation)
}

function makeDirectory(directoryLocation) {
    fs.mkdirSync(directoryLocation)
}

function prepareImageDir(directoryLocation) {
    const directoryExists = isDirectoryExists(directoryLocation)
    if (!directoryExists) {
        makeDirectory(directoryLocation)
    }
}

module.exports = {
    prepareImageDir
}