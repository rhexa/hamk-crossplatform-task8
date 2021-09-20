const express = require('express')
const router = require('./Router')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000
const BASE_URL = process.env.BASE_URL
process.env.BASE_URL = process.env.NODE_ENV === 'production' ? BASE_URL : `${BASE_URL}:${port}`

// const base = 'http://localhost';
// app.set('base', `${base}:${port}`);

app.use('/api', router)
app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')))

app.listen(port, () => console.log(`Express Crud server has been started and listening on port ${port}`))
