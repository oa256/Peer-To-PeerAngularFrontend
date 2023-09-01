import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Subject, window } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { __values } from 'tslib';
import * as signalR from "@microsoft/signalr"
import { error } from 'jquery';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
//import 'sweetalert2/src/sweetalert2.scss';

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
  styleUrls: ['./dashboard.component.css'],
 
})
export class DashboardComponent implements OnInit{
 
  inputValue: string = '';
  CurrentUserData!: UserData[];
UserPersonalDataN!: UserPersonalData;

Balancedata :any;
firstN : any;

currency :any;

private hubConnection !: signalR.HubConnection;



myMessages : any;
  
myUsername : any;


insideChatS : any[] =[];
MessageToBesent !: FormGroup;
messageForm !: FormGroup;

NotificationLegnth : any;


  constructor( private auth:AuthService , private _router :Router , public fb: FormBuilder , private _snackBar: MatSnackBar){

 
  }

  changeBalance !: FormGroup
   

  

  ngOnInit(): void {

    this.messageForm = this.fb.group({
      message: [''], // Initialize the form control
    });


    this.auth.GetMessages().subscribe({

      next :(value)=> {
        
        console.log(value);
        
      this.myMessages = value;
      
     this.insideChatS.push(value.chart)
      
      
      
      
      },
      error(err) {
        alert(err?.error.response)
      },
      
      });
  
  


   this.StartHub();
    




  this.auth.dashboard().subscribe({
    next:(res)=>{
    
      this.CurrentUserData =res;
      this.Balancedata =res[0].balance;
      this.currency= res[0].currency;
     console.log(res)
     ;
    
      
    },
    error:(err)=>{
      alert(err?.error.response)
    }
  
  })

  this.auth.getUserdetails().subscribe({
    next : value =>{
      this.myUsername = value.username

      console.log(value);
    
    
    },
    error(err) {
      alert(err?.error.response)
    },
    
    
    
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


  changebalance2(value:string){


  // var data =  this.changeBalance.controls["accountNumber"].value

   var data2 = this.CurrentUserData.filter(x=> x.account_Number === value);

   this.Balancedata = data2[0].balance;

  this.currency = data2[0].currency;

   console.log(this.Balancedata);


  }



  StartHub(){


    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:7088/chat")
    .build();
  
  this.hubConnection
  .start()
  .then(() => console.log('Connection started'))
  .catch(err  => console.log('Error while starting connection: ' + err))
  
  this.hubConnection.on("ReceiveMessage",(message:string,user:string )=>{
  
    //alert(user);
    console.log(user);
    console.log(message);
    
    });

    const chartss = {
      UsernameSender: String,
      UsernameReceiver: String,
      Message: String,
    };
    
    this.hubConnection.on("ChartMessages", (chat :any)=>{
  console.log(chat);


      //alert(user);
    if(chat.usernameReceiver == this.myUsername){
    this.insideChatS.push(chat)
    console.log(this.insideChatS)
    
    }
    if(chat.usernameSender == this.myUsername){
    
      this.insideChatS.push(chat);
      console.log(this.insideChatS)
    }
    
    
      console.log(chat);
     
      
      });
      
    
    
    }
    
  
    SendMessage( username : any){

      console.log(this.inputValue);
      
      this.inputValue = '';
  
      //const messageValue = this.messageForm.get('message').value;
  
      this.MessageToBesent = this.fb.group({
         UsernameSender :[this.myUsername],
         UsernameReceiver :[ username],
         Message:[this.inputValue],
         DateTime: [Date.now()], 
  
      })
       
      const messageValue = this.messageForm.get("message")?.value;


      const chart = {
        UsernameSender: this.myUsername,
        UsernameReceiver: username,
        Message: messageValue,
      };
      
  console.log(chart);
  
  
   this.hubConnection.invoke("SendMessagesToDB", chart)
      
   .then(() => {
    console.log('Message sent to the hub successfully. from User');

    console.log(chart.Message);
    this.insideChatS.push(chart);
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });
      
      
      
      
        
      }
      
 



  




  
}
