import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


export class TransactionData{
  constructor(
    public account_Number_of_reciever: string,
    public account_Number_of_seneder: string,
    public amount: number,
    public date : string,
    public firstname: string,
    public lastname: string,
    public type_of_transaction: string,
    public currency : string


  ){}


}
export class UserData{
  constructor(
    public account_Number: string,
    public balance: number,
    public currency : string,
    public id: number,

  ){}


}
export class UserPersonalData{
  constructor(
    public firstName: string,
    public lastName : string,
 

  ){}


}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
 
  CurrentUserData!: UserData;
UserPersonalDataN!: UserPersonalData;

Balancedata :any;
firstN : any;

  constructor( private auth:AuthService , private _router :Router){}

  ngOnInit(): void {

  this.auth.dashboard().subscribe({
    next:(res)=>{
    
      this.CurrentUserData =res;
      this.Balancedata =res;

     console.log(res)
     ;
    
      
    },
    error:(err)=>{
      alert(err?.error.response)
    }
  
  })

 

  this.auth.FnL().subscribe({
    next:(res)=>{
     // alert(res.response)

     this.UserPersonalDataN =res;

     this.firstN =res;
    console.log(res)
    
      
    },
    error:(err)=>{
      alert(err?.error.response)
    }
  
  })


  }



  
}
