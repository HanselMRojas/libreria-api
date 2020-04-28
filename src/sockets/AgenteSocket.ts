export default (io: any) => {
  io.on('connection', (socket: any) => {
    socket.on('aaa', () =>{
      console.log('hello')
    })
    console.log('from server', socket.id)
  })
}
