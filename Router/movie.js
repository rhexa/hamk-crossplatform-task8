const express = require('express')
const movies = require('../models/movie')
const Movie = movies.Movie
const { uploadPicture, uploadTemp } = require('../models/picture')
const router = express.Router({ mergeParams: true })

// get all
router.get('/', (req, res) => {
  res.json(movies.getMovies())
})

// get by id
router.get('/:id', (req, res) => {
  const id = req.params.id

  const movie = new Movie(id)

  res.json(movies.getMovie(movie))
})

// add new movie
router.post('/', async (req, res) => {
  const movie = new Movie()
  movie.parseMovie(req.body)

  if (movie.picture && Object.keys(movie.picture).length !== 0) {
    try {
      movie.picture = await uploadPicture(movie.picture, req)
    } catch (error) {
      console.log(error)
    }
  }
  movies.addMovie(movie)
  res.json(movie)
})

// update
router.put('/:id', async (req, res) => {
  const movie = new Movie(req.params.id)
  movie.mergeMovie(req.body)

  if (req.body.picture && Object.keys(req.body.picture).length !== 0) {
    try {
      movie.picture = await uploadPicture(req.body.picture, req)
    } catch (error) {
      console.log(error)
    }
  }

  movies.updateMovie(movie)
  res.json(movie)
})

// delete
router.delete('/:id', (req, res) => {
  let movie = movies.getMovie(new Movie(req.params.id))
  movie = movies.deleteMovie(movie)
  res.json(movie)
})

// add new picture (upload to tmp folder, to persist the picture, post the temporary path to add new movie.picture field)
router.post('/uploadpicture', uploadTemp)

module.exports = router
