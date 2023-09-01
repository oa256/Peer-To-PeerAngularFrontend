import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as signalR from "@microsoft/signalr"
import { __values } from 'tslib';
import {map, startWith} from 'rxjs/operators';
import {MatInputModule} from '@angular/material/input';
import {NgFor, AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';

export class UsersFullname{
constructor(
  public username: string,
  public Firstname: string
){

}

}


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})


export class NavigationComponent  implements OnInit{

  firstN : any;
  Username : any;
  private hubConnection !: signalR.HubConnection;
  Notifications : any;
  Header :any;

  UserFound : any;
 
  constructor( private auth:AuthService , private _router :Router  , private _snackBar: MatSnackBar ,  public dialog: MatDialog  ){}
  
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  options2: any;
  filteredOptions!: Observable<any[]>;
  messages :any ;

ngOnInit(): void {

this.auth.GetMessages().subscribe({
      next :(result)=> {
        
    console.log(result);
    this.messages= result;
      

        
      },
      error :(err)=> {
        
      },
      })


this.auth.GetOtherUsersInfo().subscribe({
next :(value)=> {

  this.options2 = value;
  

  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || '')),
   );

  console.log(this.options2);

    },
    error :(err)=> {
  
    },

    })


   this.UserFound = true;



    this.auth.GetMyNotification().subscribe({
      next : value =>{

          this.Notifications = value
          console.log(value);

      },
      error(err){

        alert(err?.error.response)
      }





    })

    this.startConnection();

    this.auth.getUserdetails().subscribe({
      next : value =>{
        this.Username = value
        console.log(value);
      
      
      },
      error(err) {
        alert(err?.error.response)
      },
      
      
      
          })
         


  }
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

  public  _filter(value: string): any[] {

    console.log(this.filteredOptions)   



    const filterValue = value.toLowerCase();

    console.log(filterValue);
  
    return this.options2.filter((option: { username: string; fullname: string; }) =>
    option.username.toLowerCase().includes(filterValue) ||
    option.fullname.toLowerCase().includes(filterValue)
  ).map((option: { username: any; }) => option.username); // Assuming you want to return an array of username

  }
  


  startConnection = () => {


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
  if(user == this.Username.username ){

    
    this._snackBar.open(message);
    this._snackBar.dismiss();
    console.log(user);
    console.log(message);
  }



});

  }


  display( header : string){

this.Header= header;


  }


  openChatModal( value : string ){

    console.log(this.messages)
 const data =  this.messages.filter((option: { username: string; chat: any }) =>
    option.username.includes(value) 
   
  ).map((option: { chat: any; }) => option.chat); 
 
  console.log(this.messages)
  console.log(data);


    
    const dialogRef = this.dialog.open(ChatModalComponent, { 
      width:"50%",
       data: {username : value , chat : data} 


          });
        
          dialogRef.afterClosed().subscribe(result => {
            window.location.reload()
        
          });
    




  }


  sendIdOfImage(id : number ,message : string , date :string , title : string ,  usernameOfSender: string ){

    this.hubConnection.invoke("SetMessageToRead",id)
      
    .then(() => {
    console.log('Message sent to the hub successfully. From Admin');
  
    })
    .catch(error => {
    console.error('Error sending message:', error);
    });
      
 

    if( usernameOfSender == undefined){

    const dialogRef = this.dialog.open(NotificationModalComponent, { 
      width:"50%",
       data: {myMessage : message , mydate : date , mytitle: title } 


          });
        
          dialogRef.afterClosed().subscribe(result => {
            window.location.reload()
        
          });
    

        }
        else{

            this.openChatModal(usernameOfSender);


        }


  }

  setOffline(){
    this.hubConnection.invoke("SetOffline")
      
    .then(() => {
    console.log('User Logged out');
  
    })
    .catch(error => {
    console.error('Error sending message:', error);
    });



  }
}
