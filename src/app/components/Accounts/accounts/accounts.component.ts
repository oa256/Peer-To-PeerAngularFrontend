import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { UserData } from '../../dashboard/dashboard.component';
import { Validators } from '@angular/forms';
import { DomSanitizer,SafeResourceUrl,SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog/dialog.component';
import { error } from 'jquery';


export interface PeriodicElement {
  name: string;
  position: number;
  Rate: number;
  symbol: string;
}
export class UserDataFromBackEnd{
  constructor(
    public account_Number: string,
    public balance: number,
    public currency : string,
    

  ){}


}
export class myrates{
constructor( 
  public currency: string,
  public rate: number,
  public id: number
){}


}

export class rate{
constructor(
  public Rate : number

){}

}


const ELEMENT_DATA: myrates[] = [
  // {position: 1, name: 'DOLLAR', Rate: 775, symbol: '$'},
  // {position: 2, name: 'POUNDS', Rate: 844, symbol: '£'},
  // {position: 3, name: 'EURO', Rate: 983, symbol: 'E'},
  
];


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],


})
export class AccountsComponent  implements  OnInit{
  constructor( private auth:AuthService , private _router :Router,private fb : FormBuilder,private sanitizer:DomSanitizer ,public dialog:MatDialog){
    
  }
  createAccountData!:FormGroup;
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-rate'];
  dataSource = ELEMENT_DATA;
  datafromBackend !:  myrates[];
  mydata!: UserDataFromBackEnd[];

  currenciesFromBackend=[];
  rate!:rate;
  ngOnInit(): void {
    this.createAccountData = this.fb.group({
      currency:["", Validators.required]


    })



    this.auth.dashboard().subscribe({
      next:(res)=>{
      
       this.mydata = res;
  
       console.log(res)
       ;
      
        
      },
      error:(err)=>{
        alert(err?.error.response)
      }
    
    })


    this.auth.GetCurrencies().subscribe({
      next:(res)=>{

      this.currenciesFromBackend= res;

      console.log(res);
      },
      error:(err)=>{
        alert(err?.error.response)

      }

    })
  
    this.auth.GetRates().subscribe({
      next:(res) =>{

        this.dataSource=res;
      },
      error:(err)=>{
        alert(err?.error.response)

      }


    })


    
  }


  Sendata(){
    this.auth.CreateDomAccount(this.createAccountData.value).subscribe({
      next:(res)=>{
       alert(res)
      },
      error:(err)=>{
        alert(err?.error.response)
      }
  
  
    })



  }



  openDialog(): void {
 var number =0;

    // for (let index = 0; index <= this.dataSource.length; index++) {
    //    var element = this.dataSource[index];
    //   if(element.currency == this.createAccountData.value["currency"]){
    //     number = element.rate;


    //   }
      
      
    // };
    
     this.dataSource.forEach(element => {

       if(element.currency == this.createAccountData.value["currency"]){
         number = element.rate;


       }
      
  
 });


    this.dialog.open(DialogComponent, {
     width:"50%",
     data:{ currency: this.createAccountData.value["currency"],
            rate: number,
    
    }
    });

  
  }


}
