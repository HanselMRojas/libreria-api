import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const transport = process.env.NODE_ENV !== 'production'
  ? [
    new transports.Console({ handleExceptions: true })
  ]
  : [
    new (DailyRotateFile)({ filename: 'logs/error-%DATE%.log', level: 'error' }),
    new (DailyRotateFile)({ filename: 'logs/log-%DATE%.log' })
  ]

const formated = format.combine(
  process.env.NODE_ENV !== 'production' ? format.colorize() : format.uncolorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:MM:ss' }),
  format.printf(({ level, message, timestamp, stack }) => `${timestamp} [${level}]: ${stack || message}`)
)

const logger = createLogger({
  exitOnError: false,
  format: formated,
  transports: transport
})

export default logger
