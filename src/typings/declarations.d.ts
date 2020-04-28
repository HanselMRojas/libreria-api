declare module 'dialogflow'

declare namespace Express {
  export interface Request {
    sesion: {
      id: string
      usuario: {
        _id: string
        id: string
        rol: string
        unidad: string
        primerNombre: string
        correo: string
      }
    },
    querymen: {
      query?: object
      select?: object
      cursor?: object
    }
  }
}
