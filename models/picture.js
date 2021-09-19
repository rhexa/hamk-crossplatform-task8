const fs = require('fs').promises

const uploadTemp = async (req, res) => {
  try {
    const value = req.body.id
    if (!req.files) {
      console.log('file is required')

      res.send({
        status: 400,
        message: 'No file uploaded'
      })
    } else {
      // Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      const picture = req.files.picture
      console.log(req.files)

      // Use the mv() method to place the file in upload directory (i.e. "uploads")
      // *this code does not work, use fs module instead*
      // picture.mv("./public/uploads/" + picture.name);
      console.log('file successfully uploaded')

      // send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          id: value,
          name: picture.name,
          tempFilePath: picture.tempFilePath,
          mimetype: picture.mimetype,
          size: picture.size
        }
      })
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

const uploadPicture = async (picture, req) => {
  try {
    fs.copyFile(picture.path, './public/uploads/' + picture.name)
    picture.path = '/public/uploads/' + picture.name
    console.log(`uploaded : ${picture.path}`)
    return picture
  } catch (error) {
    picture = {}
    console.log(error)
    return picture
  }
}

module.exports = {
  uploadTemp,
  uploadPicture
}
