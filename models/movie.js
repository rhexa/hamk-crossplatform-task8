const uuid = () => new Date().getTime().toString()

let movies = [
  {
    id: '1588323375416',
    title: 'Star Wars: Episode IX',
    picture: {
      name: 'b1a786fd-172e-4ccb-b415-f06ae047dcb7.jpg',
      path: '/public/uploads/b1a786fd-172e-4ccb-b415-f06ae047dcb7.jpg'
    },
    year: '2019',
    director: 'J.J. Abrams'
  },
  {
    id: '1588323390624',
    title: 'The Irishman',
    picture: {
      name: '71434cdc-c4b5-4b83-a1e8-57e3807c387a.jpg',
      path: '/public/uploads/71434cdc-c4b5-4b83-a1e8-57e3807c387a.jpg'
    },
    year: '2019',
    director: 'Martin Scorsese'
  },
  {
    id: '1588323412643',
    title: 'Harry Potter and the Sorcerers Stone',
    picture: {
      name: '180e138a-0baa-4aa6-94fd-3f49ac392382.jpg',
      path: '/public/uploads/180e138a-0baa-4aa6-94fd-3f49ac392382.jpg'
    },
    year: '2001',
    director: 'Chris Columbus'
  }
]

const Movie = class {
  constructor (id = uuid(), title = 'Default', picture = {}, year = 2020, director = 'Default') {
    this.id = id
    this.title = title
    this.picture = picture
    this.year = year
    this.director = director
  }

  // for updating movie's data
  mergeMovie (movie) {
    if (movie.title) this.title = movie.title
    if (movie.picture) this.picture = movie.picture
    if (movie.year) this.year = movie.year
    if (movie.director) this.director = movie.director
  }

  // for adding a new movie
  parseMovie (obj) {
    if (obj.id) this.id = obj.id
    if (obj.title) this.title = obj.title
    if (obj.picture) this.picture = obj.picture
    if (obj.year) this.year = obj.year
    if (obj.director) this.director = obj.director
  }
}

const getMovies = () => {
  return movies.map(m => (
    {
      id: m.id,
      title: m.title,
      picture: {
        name: m.picture.name,
        path: process.env.BASE_URL + m.picture.path
      },
      year: m.year,
      director: m.director
    }
  )
  )
}

const getMovie = (movie) => {
  movie.parseMovie(getMovies().find(mov => mov.id === movie.id))
  return movie
}

const addMovie = (movie) => { movies.push(movie) }

const updateMovie = (movie) => {
  const index = new Movie()
  index.mergeMovie(movies.findIndex(mov => mov.id === movie.id))
  index.mergeMovie(movie)
  movies.splice(index, 1, movie)
  return index
}

const deleteMovie = (movie) => {
  movies = movies.filter(mov => mov.id !== movie.id)
  return movie
}

module.exports = {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
  Movie
}
