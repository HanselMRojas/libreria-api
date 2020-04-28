const EventEmitter = require('events')

class BackendEmiter extends EventEmitter {}
const emiter = new BackendEmiter()

export default emiter
