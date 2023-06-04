import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "http://localhost:7088/api";
  constructor( private http: HttpClient) { }



  

  signup(userObj:any){
    return this.http.post<any>(`${this.baseUrl}/PeerToPeer/register`,userObj)
  }


  login(userObj:any){
    return this.http.post<any>(`${this.baseUrl}/PeerToPeer/login`,userObj)


  }
  dashboard(){
    
    return this.http.get<any>(`${this.baseUrl}/PeerToPeer/GetAccountInfo`)

  }
  Transactions(){
    return this.http.get<any>(`${this.baseUrl}/PeerToPeer/TransferHistory`)

  }

  FnL(){
    return this.http.get<any>(`${this.baseUrl}/PeerToPeer/FirstAndLastName`)
  }

  loggedIn(){
    return !!localStorage.getItem("Token")

  }

  getUserdetails(){
    return this.http.get<any>(`${this.baseUrl}/PeerToPeer/GetUserDetails`)
  }

  Transfer(userObj: any){
    return this.http.post<any>(`${this.baseUrl}/PeerToPeerTransaction/Transfer`, userObj)
  }

  CheckforAccount(userObj:any){
    return this.http.post<any>(`${this.baseUrl}/PeerToPeerTransaction/CheckforAccount`,userObj)
  }

}
