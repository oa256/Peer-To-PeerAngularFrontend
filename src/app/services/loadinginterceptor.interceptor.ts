import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable,finalize } from 'rxjs';
import { LoaderServiceService } from './loader-service.service';

@Injectable()
export class LoadinginterceptorInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  constructor( private userLoader : LoaderServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;

    this.userLoader.setLoading(true);

    return next.handle(request).pipe(

      finalize(() => {

        this.totalRequests--;

        if (this.totalRequests == 0) {

          this.userLoader.setLoading(false);

        }

      })

    );

  }
}
