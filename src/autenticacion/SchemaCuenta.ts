import mongoose, { Schema, Document } from 'mongoose'
import SchemaGeneral, { ISchemaGeneral } from '../servidor/SchemaGeneral'

const bcrypt = require('bcrypt')

export interface ICuenta extends Document {
  id: string
  rol: string
  clave: string
  correo: string
  primerNombre: string
  primerApellido: string
  __m: ISchemaGeneral
  codificarClave (clave: string): string
  compararClave (clave: string, hash: string): boolean
}

const CuentaSchema: Schema = new Schema({
  id: {
    type: String,
    unique: true,
    index: true
  },
  // Schema
  rol: {
    type: String,
    enum: ['USUARIO', 'ADMINISTRADOR'],
    default: 'USUARIO'
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  clave: {
    type: String,
    required: true,
    trim: true
  },
  nickname: {
    type: String,
    unique: true,
    trim: true
  },
  __m: { ...SchemaGeneral }
}, {
  collection: 'auth_cuentas',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  versionKey: false
})

CuentaSchema.method('codificarClave', function (clave: string): string {
  return bcrypt.hashSync(clave, bcrypt.genSaltSync(11))
})

CuentaSchema.method('compararClave', function (clave: string, hash: string): boolean {
  return bcrypt.compareSync(clave, hash)
})

export default mongoose.model<ICuenta>('Cuenta', CuentaSchema)
