import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

intercept(req: HttpRequest<any>, next: HttpHandler){

   let MyToken=localStorage.getItem("Token")
  let tokenizedReq =req.clone({
    setHeaders:{
      Authorization : `Bearer ${MyToken}`
    }

  })
  return next.handle(tokenizedReq)
  
}

}
