/* eslint-disable max-len */
import { Request, Response } from 'express'
import * as morgan from 'morgan'
import logger from './logger'

morgan.token('message', function (req, res) {
  return res.statusMessage
})

const successResponseFormat = ':method :url :status - :response-time ms'
const errorResponseFormat = ':method :url :status - :response-time ms - message: :message'

export const successHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) },
})

export const errorHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (msg: string) => logger.error(msg.trim()) },
})
