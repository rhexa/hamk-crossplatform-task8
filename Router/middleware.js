const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const cors = require('cors');

router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))
router.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))

module.exports = router
