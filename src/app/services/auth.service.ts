import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "http://localhost:7088/api";
  constructor( private http: HttpClient ) { }



  

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
  UpdateUser(userObj:any){
    return this.http.post<any>(`${this.baseUrl}/PeerToPeer/UpdateUserDetails`,userObj)
  }
  CreditAccount(userObj:any){
    return this.http.post<any>(`${this.baseUrl}/PayStack/InitializePayment`,userObj)
  }

  ChangePin(userObj :any){
    return this.http.post<any>(`${this.baseUrl}/PeerToPeer/UpdateUserPin`,userObj)

  }
ChangePassword(userObj: any){
  return this.http.post<any>(`${this.baseUrl}/PeerToPeer/UpdateUserPassword`,userObj)
}

CheckForQuestion(){
  return this.http.get<any>(`${this.baseUrl}/PeerToPeer/GetQuestionQA`)

}
GetQuestion(){
  return this.http.get<any>(`${this.baseUrl}/PeerToPeer/GetQuestionList`)

}

CreateSecurity( userObj:any){

  return this.http.post<any>(`${this.baseUrl}/PeerToPeer/CreateQA`, userObj)
}


CheckAnswer(UserObj: any){

  return this.http.post<any>(`${this.baseUrl}/PeerToPeer/CheckAnswerQA`,UserObj)
}


CheckForPin(){

  return this.http.get<any>(`${this.baseUrl}/PeerToPeer/CheckForPin`)
}

CreatePin( userObj: any){

  return this.http.post<any>(`${this.baseUrl}/PeerToPeer/CreatePin`,userObj)
}

ResetPassword(userObj: any){
return this.http.post<any>(`${this.baseUrl}/PeerToPeer/ResetPassword`,userObj)

}

TransactionHistoryR(userObj: any){
  return this.http.post<any>(`${this.baseUrl}/PeerToPeer/TransactionHistoryDate`,userObj)

}


GenerateStateDownload(user:any){
  return this.http.post(`${this.baseUrl}/PeerToPeer/GenerateStatementDownload`,user,{ observe: 'response', responseType: 'blob' });

}

GenerateStateEmail(user:any){

  return this.http.post<any>(`${this.baseUrl}/PeerToPeer/GenerateStatementEmail`,user)

}

CreateDomAccount(user:any){

  return this.http.post<any>(`${this.baseUrl}/PeerToPeer/CreateDomAccount`,user)

}

GetCurrencies(){

  return this.http.get<any>(`${this.baseUrl}/PeerToPeer/CheckForCurrencies`)
}

GetRates(){

  return this.http.get<any>(`${this.baseUrl}/PeerToPeer/GetMyRates`)
}

GetMyCurrencies(){

  return this.http.get<any>(`${this.baseUrl}/PeerToPeer/GetmyCurrencies`)  
}

}
