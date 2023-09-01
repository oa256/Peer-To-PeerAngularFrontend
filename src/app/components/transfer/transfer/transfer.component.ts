import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';



export class TransferData{
  constructor(
    public account_Number: string,
    public amount: string,
    public pin : string,
    

  ){}
}
export class userDetail{
  constructor(
    public account_Number: string,
    public balance: number,
    public currency : string,
    

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
  AddPin!: FormGroup;
  public Pchange = false;
  public ForAccount = true;
  myCurrency!:FormGroup;

 public Accounts :any;

public mycurrent !: any;

public myBalance : any ;
public AccountNumber :any;

public userDAta !: userDetail;
ngOnInit(): void {
  
    this.change= false;
   this.myUserData = this.fb.group({

     Search:["",Validators.required],
    currency:["",Validators.required]

   })

   this.myCurrency= this.fb.group({
    currency:["",Validators.required]

   })
  
   this.Transferdatas= this.fb.group({
    Account_number : [],
    Amount : ["",Validators.required],
    Pin:["",Validators.required] ,
    currency:["",Validators.required]


   })
this.AddPin = this.fb.group({
  pin:["", Validators.required, Validators.maxLength(4), Validators.minLength(4)],
  verifyPin:["", Validators.required , Validators.maxLength(4), Validators.minLength(4)]


})

   this.auth.CheckForPin().subscribe({
      next:(res)=>{
          if (res.status == true){
              this.change = false;
              this.ForAccount= true;
              this.Tchange= false;
            console.log(res);


          }

          else{
            alert(res.response);
            this.Pchange = true;
            this.change = false;
            this.Tchange= false;
            console.log(res);

          }
      },
      error:(err)=>{
        alert(err?.error.response)
      }



   })
  
   this.auth.dashboard().subscribe({
    next:(res)=>{
    
      // this.CurrentUserData =res;
      // this.Balancedata =res;
      this.Accounts=res;

      this.userDAta= this.Accounts.filter((s: { currency: string; }) => s.currency === "NGN");
       
      console.log(this.userDAta);

      this.myBalance = this.userDAta;
      //console.log(this.userDAta.account_Number);
     // this.AccountNumber = this.userDAta;
      //this.myBalance= this.userDAta.balance;
      
 //     console.log(this.userDAta.account_Number);
    
     console.log(res)
     ;
    
      
    },
    error:(err)=>{
      alert(err?.error.response)
    }
  
  })




}
Userdata(){

 this.myUserData.controls["currency"].setValue(this.myCurrency.value['currency']) ;
 
this.auth.CheckforAccount(this.myUserData.value).subscribe({
        next:(res)=>{
          if (res.status == true){
          // alert(res.response);
          
          this.SearchData = res;
          this.CurrentUsers = this.myUserData.value["Search"];
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

     

      this.Transferdatas.controls["currency"].setValue(this.myCurrency.value["currency"]) 

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
      window.location.reload();
      
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
  window.location.reload();
}



SendPin(){

this.auth.CreatePin(this.AddPin.value).subscribe({
  next:(res)=>{
    if(res.status==true){
      alert(res.response);
      window.location.reload()

    }
    else{

      alert(res.response);
    }

  },
error: (err)=>{

  alert(err?.error.response)
    
}


})




}



sendCurrency(){


  // console.log(event.)
  this.ForAccount = false;
  this.change = true;


  
  console.log(this.myCurrency )
  



}
AccountsPage(){


  // console.log(event.)
  this.ForAccount = true;
  this.change = false;


  
  console.log(this.myCurrency )
  



}

showBalance(x: string ){



  var data = this.Accounts.filter((s: { currency: string; }) => s.currency === x)
 

  this.myBalance = data;
}

}
