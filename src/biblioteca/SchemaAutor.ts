import mongoose, { Schema, Document } from 'mongoose'
import SchemaGeneral, { ISchemaGeneral } from '../servidor/SchemaGeneral'

const uuid = require('uuid-base62')

export interface IAutor extends Document {
  id: string
  nombre: string
  descripcion: string
  __m: ISchemaGeneral
}

const AutorSchema: Schema = new Schema({
  id: {
    type: String,
    unique: true,
    index: true,
    default: uuid.v4()
  },
  nombre: {
    type: String,
    trim: true,
    required: true
  },
  descripcion: {
    type: String,
    trim: true,
    required: true
  },
  __m: { ...SchemaGeneral }
}, {
  collection: 'autores',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  versionKey: false
})

AutorSchema.plugin(require('mongoose-keywords'), { paths: ['nombre', 'descripcion'] })

export default mongoose.model<IAutor>('Autor', AutorSchema)
