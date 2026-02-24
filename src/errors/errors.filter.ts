import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
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
      return response.status(status).send({
        ...new ForbiddenException('Token expired'),
        debug: errorMessage,
      });
    }

    if (status === 550) {
      return response.status(status).send({
        ...new ForbiddenException('Unable to send request by provided address'),
        debug: errorMessage,
      });
    }

    if (status === (HttpStatus.UNAUTHORIZED as number)) {
      return response.status(status).send({
        ...new UnauthorizedException(errorMessage),
      });
    }

    if (status === (HttpStatus.NOT_FOUND as number)) {
      return response
        .status(status)
        .send({ ...new NotFoundException('Not found'), debug: errorMessage });
    }

    if (status && response) {
      return response.status(status).send(response);
    }

    return response
      .status(status)
      .send({ ...new InternalServerErrorException(), debug: error.message });
  }
}
