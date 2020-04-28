import mongoose, { Schema, Document } from 'mongoose'
import { ICuenta } from './SchemaCuenta'

// TODO mejorar types
const uuid = require('uuid-base62')

export interface ISesion extends Document {
  id: string
  usuario: ICuenta['_id']
  activo: boolean
  fechaCreacion: Date | null
  ultimaInteraccion: Date | null
}

const SesionSchema: Schema = new Schema({
  id: {
    type: String,
    unique: true,
    index: true,
    default: uuid.v4()
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Cuenta'
  },
  activo: {
    type: Boolean,
    default: true
  },
  fechaCreacion: {
    type: Date,
    default: null
  },
  ultimaInteraccion: {
    type: Date,
    default: null
  }
}, {
  collection: 'auth_sesiones',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  versionKey: false
})

export default mongoose.model<ISesion>('Sesion', SesionSchema)
