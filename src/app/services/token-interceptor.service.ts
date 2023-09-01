import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { TokenExpiredService } from './token-expired.service';
import jwt_decode , {JwtPayload}from 'jwt-decode';
import { HttpResponse } from '@microsoft/signalr';
import { error } from 'jquery';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private tokenExpiredService: TokenExpiredService , public _router : Router) { }

intercept(req: HttpRequest<any>, next: HttpHandler){

   let MyToken=localStorage.getItem("Token")
//    if (MyToken) {
   
//     const decodedToken: {exp?:number} = jwt_decode(MyToken);
 
//   if (decodedToken && typeof decodedToken.exp === 'number') {
//   const currentTimestampInSeconds = Math.floor(Date.now() / 1000);

//   if (decodedToken.exp < currentTimestampInSeconds) {
//   this.tokenExpiredService.open();
//   console.log('Token has expired');
// }
// } else {

// console.log('Token expiration information not available');
// }
    
//   }
  let tokenizedReq =req.clone({
    setHeaders:{
      Authorization : `Bearer ${MyToken}`
    }

  })

  return next.handle(tokenizedReq).pipe(
tap((event : HttpEvent<any>)=>{
  if (event instanceof HttpResponse) {
    // Request was successful (status code 200)
    console.log('Request was successful');
  } 



}),
catchError((error: HttpErrorResponse) =>{
  // Handle errors
  alert(error.message );
  this._router.navigate(['/login'])
  console.error('Request failed with status code:', error.status);
  console.error('Error message:', error.message);
  // You can perform error-specific handling here

  // Rethrow the error to propagate it to the calling code
  return throwError(error);

})
  );
  
}

}
