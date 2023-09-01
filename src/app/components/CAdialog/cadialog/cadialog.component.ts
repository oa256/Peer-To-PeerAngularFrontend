import { Component } from '@angular/core';
import { OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule,MAT_DIALOG_DATA ,} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
export interface DialogData {
  currency:string;
  rate :number;
}


export class account {
constructor(  
  public account_Number: string,
  public balance: number,
  public currency : string,
  ){}
}


export interface myRatesObject{
currency :string 
rate : number 
charge : number 
id: number

}

export interface placeholder{
AccountDetail : Array<object>,
rate: Array< myRatesObject>

}
export class UserDataFromBackEnd{
  constructor(
    public account_Number: string,
    public balance: number,
    public currency : string,
    

  ){}


}
@Component({
  selector: 'app-cadialog',
  templateUrl: './cadialog.component.html',
  styleUrls: ['./cadialog.component.css']
})
export class CAdialogComponent  implements OnInit {

  constructor(public dialogRef: MatDialogRef<CAdialogComponent>, @Inject(MAT_DIALOG_DATA) public data: placeholder , public auth : AuthService , public fb :FormBuilder) {}
  currenciesFromBackend = [];

  CreditAccountData!: FormGroup;

  mydata!: any;

  myrate: any;
  ngOnInit(): void {

    


    this.CreditAccountData = this.fb.group({

     
      amount:["",Validators.required],
      currency:["",Validators.required]

    })



    console.log(this.data)
    // this.currenciesFromBackend =this.data
    console.log(this.data.AccountDetail)
   console.log(this.data.rate)
    this.mydata = this.data.AccountDetail;
    console.log(this.currenciesFromBackend)





  }

  onNoClick(): void {
    this.dialogRef.close();



  }

rateometer(){

  let x = this.data.rate

  x.forEach(t=> {
  
    if (t.currency == this.CreditAccountData.controls["currency"].value){
      this.myrate = t.rate;
      console.log(this.myrate);
    }
  
  
  }
    
   
    
  )


}


  sendToBackEnd(){
    



var data = this.data.rate.filter(x=> x === this.CreditAccountData.controls["currency"].value)

console.log(data);




    Swal.fire({
      title: 'Are you sure? ' ,
      text:   "You won't be able to revert this! " ,
      icon: 'warning',
    
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Convert it',
      
    
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.CreditDomAccount(this.CreditAccountData.value).subscribe({

          next:(res)=>{
          alert( res.statusMessage)
           console.log(res)
           ;
          
            
          },
          error:(err)=>{
            alert(err?.error.response)
          }
        
      
      
      
      
        })
      
      
      console.log(this.CreditAccountData);


      }
    })
   

 
    this.dialogRef.close();

  }

}
