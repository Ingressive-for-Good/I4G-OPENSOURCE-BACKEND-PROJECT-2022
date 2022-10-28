const multer = require('multer')

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true)
    } else {
        return cb(new Error('Invalid image type'))
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
})

module.exports = upload
