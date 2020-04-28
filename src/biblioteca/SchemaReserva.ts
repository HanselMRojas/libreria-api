import mongoose, { Schema, Document } from 'mongoose'
import SchemaGeneral, { ISchemaGeneral } from '../servidor/SchemaGeneral'
import { ILibro } from './SchemaLibro'
import { ICuenta } from '../autenticacion/SchemaCuenta'

const uuid = require('uuid-base62')

export type estadoReserva = 'EN_ESPERA' | 'EN_USO' | 'CANCELADO'

export interface IReserva extends Document {
  id: string
  estado: estadoReserva
  libro: ILibro['_id']
  usuario: ICuenta['_id']
  fechaInicio: Date
  fechaFin: Date
  __m: ISchemaGeneral
}

const Reserva: Schema = new Schema({
  id: {
    type: String,
    unique: true,
    index: true,
    default: uuid.v4()
  },
  estado: {
    type: String,
    enum: ['EN_ESPERA', 'EN_USO', 'CANCELADO'],
    default: 'EN_ESPERA'
  },
  libro: {
    type: Schema.Types.ObjectId,
    ref: 'Libro'
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: {
    type: Date,
    required: true
  },
  __m: { ...SchemaGeneral }
}, {
  collection: 'reservas',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  versionKey: false
})

export default mongoose.model<IReserva>('Reserva', Reserva)
