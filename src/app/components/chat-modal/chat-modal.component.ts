import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog , MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as signalR from "@microsoft/signalr";


@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css']
})
export class ChatModalComponent implements OnInit {

  inputValue: string = '';
  insideChatS : any[] =[];
  myUsername:any;
  RecieveUsername: any;
  messageForm!: FormGroup;
  private hubConnection !: signalR.HubConnection;

  constructor( public auth : AuthService , public dialogRef: MatDialogRef<ChatModalComponent>,@Inject(MAT_DIALOG_DATA) public data : any , public fb : FormBuilder){
  }

ngOnInit(): void {

this.auth.getUserdetails().subscribe({
      next:(value)=> {
        this.myUsername= value.username;
  
        console.log(value);     
  
  
      },
      error:(err)=> {
        
      },
      })
      
      this.RecieveUsername = this.data.username;
        
      console.log(this.data.chat);

    if(this.data.chat.length >= 1){
  this.data.chat[0].forEach((element: any) => {
        this.insideChatS.push(element)


      });
    }
 
this.messageForm = this.fb.group({
        message:["", Validators.required]
  
  
      });
  
      this.StartHub();
  
  }

  SendMessage( Username : string ){

    console.log(this.inputValue);
    
    this.inputValue ="";
    const message = this.messageForm.get("message")?.value;

  // const message =  this.messageForm.controls["message"].value;
    console.log(message);
       
    
    
    const chart = {
        UsernameSender: this.myUsername,
        UsernameReceiver: Username,
        Message: message,
      };
    
    this.hubConnection.invoke("SendMessagesToDB",chart)
      
    .then(() => {
    console.log('Message sent to the hub successfully. From Admin');
    this.insideChatS.push(chart)

    console.log(this.insideChatS)
    })
    .catch(error => {
    console.error('Error sending message:', error);
    });
      
      
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
        
       
        this.hubConnection.on("ChartMessages",(chat: any )=>{
        
        if(chat.usernameReceiver == this.myUsername){
        this.insideChatS.push(chat)
        
        console.log(this.insideChatS);
        
        }
        if(chat.usernameSender == this.myUsername){
        
          this.insideChatS.push( chat);
          console.log(this.insideChatS);
        }
        
        
        console.log(chat);
          
          });
          
       
        
        }
    



}
