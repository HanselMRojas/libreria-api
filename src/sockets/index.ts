import AgenteSocket from './AgenteSocket'

export default (io: any) => {
  return [
    AgenteSocket(io)
  ]
}
