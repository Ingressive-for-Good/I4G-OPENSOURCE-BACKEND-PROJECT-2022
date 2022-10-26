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
        cb({ message: 'Invalid file type' }, false)
    }
}

const upload = multer({ storage, fileFilter, limits: 5 * 1024 * 1024 })

module.exports = upload
