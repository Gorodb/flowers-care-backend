import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

const logger = new Logger('errors.filter.ts');

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(error: HttpException, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    const status = error.getStatus();
    const errorName = error.name;
    const errorMessage = error.message;

    logger.error(errorName);
    logger.error(error);

    if (errorName === 'TokenExpiredError') {
      return response
        .status(status)
        .json({ success: false, reason: 'Token expired', status });
    }

    if (status === 550) {
      return response.status(status).json({
        success: false,
        reason: 'Unable to send request by provided address',
        status,
      });
    }

    if (status === (HttpStatus.UNAUTHORIZED as number)) {
      return response.status(status).json({
        success: false,
        reason: errorMessage,
        status,
      });
    }

    if (status === (HttpStatus.NOT_FOUND as number)) {
      return response
        .status(status)
        .json({ success: false, reason: 'Not found', status });
    }

    if (status && response) {
      return response.status(status).json(response);
    }

    return response.status(status).json({
      success: false,
      reason: errorMessage,
      status,
    });
  }
}
