import mongoose, { Schema, Document } from 'mongoose'
import SchemaGeneral, { ISchemaGeneral } from '../servidor/SchemaGeneral'
import { IAutor } from './SchemaAutor'
import { ICuenta } from '../autenticacion/SchemaCuenta'

const uuid = require('uuid-base62')

export interface ILibro extends Document {
  id: string
  autores: IAutor['_id']
  favoritos: ICuenta['_id']
  reservas: ICuenta['_id']
  esPublico: boolean
  titulo: string
  subtitulo: string
  descricion: string
  isbn: string
  numeroPaginas: number
  fechaPublicacion: Date
  __m: ISchemaGeneral
}

const LibroSchema: Schema = new Schema({
  id: {
    type: String,
    unique: true,
    index: true,
    default: uuid.v4()
  },
  autores: [{
    type: Schema.Types.ObjectId,
    ref: 'Autor'
  }],
  favoritos: [{
    type: Schema.Types.ObjectId,
    ref: 'Cuenta'
  }],
  reservas: [{
    type: Schema.Types.ObjectId,
    ref: 'Cuenta'
  }],
  // Schema
  esPublico: {
    type: Boolean,
    default: true
  },
  titulo: {
    type: String,
    trim: true,
    requited: true
  },
  subtitulo: {
    type: String,
    trim: true,
    requited: true
  },
  descripcion: {
    type: String,
    trim: true,
    required: true
  },
  isbn: {
    type: String,
    trim: true,
    required: true
  },
  numeroPaginas: {
    type: Number,
    default: 0
  },
  fechaPublicacion: {
    type: Date,
    default: null
  },
  __m: { ...SchemaGeneral }
}, {
  collection: 'libros',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  versionKey: false
})

LibroSchema.plugin(require('mongoose-keywords'), { paths: ['titulo', 'descripcion', 'isbn', 'subtitulo', 'fechaPublicacion'] })

LibroSchema.virtual('urlImagen').get(function (this: ILibro): string {
  return `https://libreriadelassombras.s3-sa-east-1.amazonaws.com/${this.id}.png`
})

export default mongoose.model<ILibro>('Libro', LibroSchema)
