import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export default class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const httpHost = host.switchToHttp();
    const res = httpHost.getResponse<Response>();
    if (exception instanceof UnauthorizedException) {
      return res.status(exception.getStatus()).send({
        success: false,
        message: 'You are not authorized',
        code: exception.getStatus(),
      });
    } else if (exception instanceof HttpException) {
      return res.status(exception.getStatus()).send(exception.getResponse());
    } else {
      return res.status(500).send({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception?.message,
      });
    }
  }
}
