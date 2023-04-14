import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: String,
  read: Boolean,
  series: String 
})

const Book = mongoose.model('Book', bookSchema)

export {
  Book
}