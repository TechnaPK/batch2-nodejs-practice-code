var multer = require('multer')

var customConfig = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, './uploads')
    },
    filename: function (req, file, next) {
        next(null, Math.random() + '-' + file.originalname)
    }
})

var upload = multer({ storage: customConfig })

module.exports = upload