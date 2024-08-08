
import { Injectable, Inject, CACHE_MANAGER, ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CustomCacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const key = `cache-${request.url}`;
    const cachedResponse = await this.cacheManager.get(key);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle().pipe(
      tap(response => this.cacheManager.set(key, response, 300)),// Set TTL as a number (300 seconds)
      
    );
  }
}
