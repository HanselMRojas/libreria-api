import { Request, Response, NextFunction } from 'express'

import Autor from './SchemaAutor'
import Libro from './SchemaLibro'

import moment from 'moment'
import mongo from '../librerias/mongo'

const uuid = require('uuid-base62')

/**
 * Listar Autores
 * Este metodo esta diseñado para listar Autores.
 * 
 * @method GET
 * @role public
 */
export async function listarAutores (req: Request, res: Response, next: NextFunction) {
  try {
    let { query, select, cursor } = req.querymen

    const mongoQuery = {
      '__m.borrado': false,
      ...query
    }

    let autores = await Autor.find(
      mongoQuery,
      select,
      cursor
    )

    res.status(200).json({
      autores
    })
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

/**
 * Detalle Autor
 * Este método detalla un autor basado en su ID.
 * 
 * @method GET
 * @role public
 */
export async function detalleAutor (req: Request, res: Response, next: NextFunction) {
  try {
    const { querymen, params } = req

    const mongoQuery = {
      id: params.autorId,
      esPublico: true,
      '__m.borrado': false
    }

    const autor = await Autor.findOne(
      mongoQuery, 
      querymen.select
    ).populate('autor')

    if (autor) {
      const libros = await Libro.find({
        '__m.borrado': false,
        autor: autor._id
      })

      res.status(200).json({
        autor,
        libros
      })
    } else {
      res.status(404).json({
        mensaje: 'El autor solicitado no ha sido encontrado',
        estado: 404
      })
    }
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

/**
 * Crear Autor
 * Este endpoint crea un autor
 * 
 * @method POST
 * @role ADMIN
 */
export async function crearAutor (req: Request, res: Response, next: NextFunction) {
  try {
    let { body } = req

    let nuevoAutor = new Autor({
      ...body,
      id: uuid.v4(),
      '__m.fechaCreado': moment()
    })

    let guardado = await nuevoAutor.save()

    res.status(201).json({
      autor: guardado
    })
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

/**
 * Editar Autor
 * Este endpoint edita un autor dado su Id
 * 
 * @method POST
 * @role ADMIN
 */
export async function editarAutor (req: Request, res: Response, next: NextFunction) {
  try {
    let { body, params } = req

    let autor = await Autor.findOne({
      id: params.autorId,
      '__m.borrado': false
    })

    if (autor) {
      let actualizar = Object.assign(autor, {
        ...body,
        id: autor.id,
        '__m.fechaActualizado': moment()
      })

      await actualizar.save()

      res.status(201).json({
        autor: actualizar
      })
    } else {
      res.status(404).json({
        mensaje: 'El autor solicitado no ha sido encontrado'
      })
    }
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

/**
 * Eliminar Autor
 * Este endpoint elimina un autor dado su Id
 * 
 * @method POST
 * @role ADMIN
 */
export async function eliminarAutor (req: Request, res: Response, next: NextFunction) {
  try {
    const { body, params } = req

    let autor = await Autor.findOne({
      id: params.autorId,
      '__m.borrado': false
    })

    if (autor) {
      const actualizar = Object.assign(autor, {
        ...body,
        id: params.autorId,
        '__m.esBorado': true,
        '__m.fechaBorrado': moment()
      })

      await actualizar.save()

      await Libro.updateMany({ autor: autor._id }, { $set: { '__m.borrado': true, '__m.fechaBorrado': moment() } })

      res.status(201).json({
        mensaje: 'Autor borrado correctamente',
        estado: 201
      })
    } else {
      res.status(404).json({
        mensaje: 'El autor solicitado no ha sido encontrado'
      })
    }
  } catch (error) {
    next({ estado: 500, original: error })
  }
}
