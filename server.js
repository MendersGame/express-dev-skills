import "dotenv/config.js"
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import createError from 'http-errors'
import logger from 'morgan'
import methodOverride from "method-override"
import './config/database.js'
import { router as indexRouter } from './routes/index.js'
import { router as bookRouter } from './routes/books.js'

const app = express()

app.set('view engine', 'ejs')

app.use(function(req, res, next) {
  req.time = new Date().toLocaleTimeString()
  next()
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  )
)
app.use(methodOverride('_method'))

app.use('/', indexRouter)
app.use('/books', bookRouter)

app.use(function (req, res, next) {
  console.log(req.time)
  next(createError(404))
})
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

export { app }