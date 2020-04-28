const slug = require('slug')

export interface ISchemaGeneral extends Document {
  borrado?: boolean,
  fechaCreado?: Date | null
  fechaActualizado?: Date | null
  fechaBorrado?: Date | null
}

export default {
  borrado: {
    type: Boolean,
    default: false
  },
  fechaCreado: {
    type: Date,
    default: null
  },
  fechaActualizado: {
    type: Date,
    default: null
  },
  fechaBorrado: {
    type: Date,
    default: null
  }
}
