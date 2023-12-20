const path = require('path')

const express = require('express')
const multer  = require('multer');

const getLocalImageDir = require('./image-dir')
const { prepareImageDir } = require('./prepare-image-dir')
const { getImageUrls } = require('./get-image-urls')

const PORT = process.env.PORT || 5000
const environment = process.env.IMAGE_APP_ENVIRONMENT || 'dev'
const LOCAL_IMAGE_DIR = getLocalImageDir(environment)

const app = express()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, LOCAL_IMAGE_DIR)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

prepareImageDir(LOCAL_IMAGE_DIR)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.locals.basedir = path.join(__dirname, 'views');

app.use('/images', express.static(LOCAL_IMAGE_DIR))

app.get('/', (req, res) => {
    const images = getImageUrls(LOCAL_IMAGE_DIR, 'images')
    res.render('index', { images: images })
})

app.get('/upload', (req, res) => {
    res.render('upload')
})

app.post('/upload', upload.single('file'), (req, res) => res.redirect('/'))

app.use((req, res, next) => {
    res.status(404).send('Sorry can\'t find that!')
})

// custom error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

const server = app.listen(PORT, () => {
    console.log(`application is listening on port ${PORT}`)
})

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        console.log('HTTP server closed')
    })
})