import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UsersResponseDto } from './dto/users-responce.dto';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        // run something before the response is sent out.
        // Please note that plainToClass is deprecated & is now called plainToInstance

        return plainToInstance(UsersResponseDto, data, {
          // By using excludeExtraneousValues we are ensuring that only properties decorated with Expose() decorator are included in response.

          excludeExtraneousValues: true,
        });
      }),
    );
  }
}