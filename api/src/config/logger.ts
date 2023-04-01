import * as winston from 'winston'

class Logger {
  private logger: winston.Logger
  private static instance: Logger

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.ENV === 'development' ? 'debug' : 'info',
      format: winston.format.combine(
        process.env.ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level}: ${message}`),
      ),
      transports: [
        new winston.transports.Console({
          stderrLevels: ['error'],
        }),
      ],
    })
  }

  public static getLoggerInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  public static getLogger() {
    const _logger = Logger.getLoggerInstance()
    return _logger.logger
  }
}

export default Logger.getLogger()
