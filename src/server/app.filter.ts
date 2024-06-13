import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RendererService } from '@server/infrastructure/renderer/renderer.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private rendererService: RendererService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      if (status === 404) {
        void this.rendererService.render({ response, request });
        return;
      }

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        fake: true,
      });
    } else {
      if (exception.code === 'ENOENT') {
        void this.rendererService.render({ response, request });
        return;
      }
    }
  }
}
