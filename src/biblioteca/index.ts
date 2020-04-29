import express from 'express'

import {
  listarLibros,
  detalleLibro,
  crearLibro,
  editarLibro,
  editarCounters,
  eliminarLibro
} from './ControllerLibro'

import {
  listarAutores,
  detalleAutor,
  crearAutor,
  editarAutor,
  eliminarAutor
} from './ControllerAutor'

import AdminMiddleware from '../middlewares/AdminMiddleware'
import JWTMiddleware from '../middlewares/JwtMiddleware'

const BibliotecaRouter = express.Router()
const querymen = require('querymen')

/**
 * Libros
 * =============================================== */
BibliotecaRouter.get('/libros', [
  querymen.middleware({})
], listarLibros)

BibliotecaRouter.get('/libros/:libroId', [
  querymen.middleware({})
], detalleLibro)

BibliotecaRouter.post('/libros', [
  JWTMiddleware,
  AdminMiddleware
], crearLibro)

BibliotecaRouter.post('/libros/:libroId', [
  JWTMiddleware,
  AdminMiddleware
], editarLibro)

BibliotecaRouter.post('/libros/:libroId/counters', [
  JWTMiddleware,
  AdminMiddleware
], editarCounters)

BibliotecaRouter.delete('/libros/:libroId', [
  JWTMiddleware,
  AdminMiddleware
], eliminarLibro)

/**
 * Autores
 * =============================================== */
BibliotecaRouter.get('/autores', [
  querymen.middleware({})
], listarAutores)

BibliotecaRouter.get('/autores/:autorId', [
  querymen.middleware({})
], detalleAutor)

BibliotecaRouter.post('/autores', [
  JWTMiddleware,
  AdminMiddleware
], crearAutor)

BibliotecaRouter.post('/autores/:autorId', [
  JWTMiddleware,
  AdminMiddleware
], editarAutor)

BibliotecaRouter.delete('/autores/:autorId', [
  JWTMiddleware,
  AdminMiddleware
], eliminarAutor)

export default BibliotecaRouter
