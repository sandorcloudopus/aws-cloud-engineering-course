const fs = require('fs')

function getImageUrls(imageDirectory, imagesPath, files = []) {
    const fileList = fs.readdirSync(imageDirectory);
    for (const file of fileList) {
        const name = `${imageDirectory}/${file}`;
        if (fs.statSync(name).isDirectory()) {
            getImageUrls(name, files);
        } else {
            files.push(`${imagesPath}/${file}`);
        }
    }
    return files;
}


module.exports = {
    getImageUrls
}