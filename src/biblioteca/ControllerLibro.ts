import { Request, Response, NextFunction } from 'express'

import Libro from './SchemaLibro'
import moment from 'moment'

const uuid = require('uuid-base62')

/**
 * Listar Libros
 * Este metodo esta diseñado para listar libros.
 * 
 * @method GET
 * @role public
 */
export async function listarLibros (req: Request, res: Response, next: NextFunction) {
  try {
    let { query, select, cursor } = req.querymen

    const mongoQuery = {
      '__m.borrado': false,
      ...query
    }

    let libros = await Libro.find(
      mongoQuery,
      select,
      cursor
    ).populate('autores')

    res.status(200).json({
      libros
    })
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

/**
 * Detalle Libro
 * Este método detalla un libro basado en su ID.
 * 
 * @method GET
 * @role public
 */
export async function detalleLibro (req: Request, res: Response, next: NextFunction) {
  try {
    let { querymen, params } = req

    const mongoQuery = {
      id: params.libroId,
      esPublico: true,
      '__m.borrado': false
    }

    let libro = await Libro.findOne(
      mongoQuery, 
      querymen.select
    ).populate('autor')

    if (libro) {
      res.status(200).json({
        libro
      })
    } else {
      res.status(404).json({
        mensaje: 'Libro no encontrado',
        estado: 404
      })
    }
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

/**
 * Crear Libro
 * Este endpoint crea un libro
 * 
 * @method POST
 * @role ADMIN
 */
export async function crearLibro (req: Request, res: Response, next: NextFunction) {
  try {
    let { body } = req

    let nuevoLibro = new Libro({
      ...body,
      id: uuid.v4(),
      '__m.fechaCreado': moment()
    })

    let guardado = await nuevoLibro.save()

    res.status(201).json({
      libro: guardado
    })
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

/**
 * Editar Libro
 * Este endpoint edita un libro dado su Id
 * 
 * @method POST
 * @role ADMIN
 */
export async function editarLibro (req: Request, res: Response, next: NextFunction) {
  try {
    let { body, params } = req

    let libro = await Libro.findOne({
      id: params.libroId,
      '__m.borrado': false
    })

    if (libro) {
      let actualizar = Object.assign(libro, {
        ...body,
        id: libro.id,
        '__m.fechaActualizado': moment()
      })

      await actualizar.save()

      res.status(201).json({
        libro: actualizar
      })
    } else {
      res.status(404).json({
        mensaje: 'El libro solicitado no ha sido encontrado'
      })
    }
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

/**
 * Editar Counters Libro
 * Este endpoint edita un libro dado su Id
 * 
 * @method POST
 * @role ADMIN
 */
export async function editarCounters (req: Request, res: Response, next: NextFunction) {
  try {
    let { body, params, sesion } = req
    const usuario = sesion.usuario._id

    let libro = await Libro.findOne({
      id: params.libroId,
      '__m.borrado': false
    }).populate('autores')

    if (libro) {
      let favoritos = libro.favoritos
      let reservas = libro.reservas

      if (body.favorito) {
        if (libro.favoritos.includes(usuario)) {
          favoritos = libro.favoritos.filter((idFavorito: any) => {
            return !usuario === idFavorito
          })
        } else {
          favoritos = favoritos.concat(usuario)
        }
      }

      if (body.reserva) {
        if (libro.reservas.includes(usuario)) {
          reservas = libro.reservas.filter((idReserva: any) => {
            return !usuario === idReserva
          })
        } else {
          reservas = reservas.concat(usuario)
        }
      }

      libro.favoritos = favoritos
      libro.reservas = reservas

      await libro.save()

      res.status(201).json({
        libro: libro
      })
    } else {
      res.status(404).json({
        mensaje: 'El libro solicitado no ha sido encontrado'
      })
    }
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

/**
 * Eliminar Libro
 * Este endpoint elimina un libro dado su Id
 * 
 * @method POST
 * @role ADMIN
 */
export async function eliminarLibro (req: Request, res: Response, next: NextFunction) {
  try {
    let { body, params } = req

    let libro = await Libro.findOne({
      id: params.libroId,
      '__m.borrado': false
    })

    if (libro) {
      let actualizar = Object.assign(libro, {
        ...body,
        id: params.libroId,
        '__m.esBorado': true,
        '__m.fechaBorrado': moment()
      })

      await actualizar.save()

      res.status(201).json({
        mensaje: 'Libro borrado correctamente',
        estado: 201
      })
    } else {
      res.status(404).json({
        mensaje: 'El libro solicitado no ha sido encontrado'
      })
    }
  } catch (error) {
    next({ estado: 500, original: error })
  }
}
