import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';



export class TransferData{
  constructor(
    public account_Number: string,
    public amount: string,
    public pin : string,
    

  ){}
}

export class  CurrentUser{

constructor(

  public Account_number :string
){}

}
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})



export class TransferComponent implements OnInit {

  
  constructor( private auth:AuthService , private _router :Router,private fb : FormBuilder){

    // this.CurrentUser.Account_number = (<HTMLInputElement>document.getElementById("Searchdata")).value;
    



  }
  myUserData!: FormGroup;
  SearchData:any;
  Transferdatas!: FormGroup;
  transferDataSend!: TransferData;
  CurrentUsers: any;
  public change = false;
  public Tchange = false;
ngOnInit(): void {
  
    this.change= true;
   this.myUserData = this.fb.group({

     Search:["",Validators.required]


   })
  
   this.Transferdatas= this.fb.group({
    Account_number : this.CurrentUsers,
    Amount : ["",Validators.required],
    Pin:["",Validators.required] ,


   })
  
  

}
Userdata(){

this.auth.CheckforAccount(this.myUserData.value).subscribe({
        next:(res)=>{
          if (res.status == true){
          // alert(res.response);
          
          this.SearchData = res;
          this.CurrentUsers = this.myUserData.value.Search;
         console.log(res);
          // this.CurrentUser= this.myUserData;
            this.Tchange=true;
            this.change=false;
          }

         else{
          alert(res.response)
         }
        },
        error:(err)=>{
          alert(err?.error.response)
        }
  
  
      })



}

Transferdata(){


//  this.Transferdatas= this.fb.group({
//   Account_number: this.CurrentUser ,
   
//  })
//  this.transferDataSend.account_Number=this.CurrentUser;
// this.transferDataSend.amount= this.Transferdatas.value.Amount;
// this.transferDataSend.pin= this.Transferdatas.value.Pin;
this.Transferdatas.controls['Account_number'].setValue(this.CurrentUsers);


  this.auth.Transfer(this.Transferdatas.value).subscribe({
    next:(res)=>{
      if (res.status == true){
      alert(res.response);
      console.log(res);
     
      
      }

     else{
      alert(res.response)
     }
    },
    error:(err)=>{
      alert(err?.error.response)
    }


  })



}

Goback(){

  this.Tchange=false;
  this.change=true;



}


}
