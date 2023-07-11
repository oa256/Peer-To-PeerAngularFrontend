import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {NgIf, JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NewdialogComponent } from '../../newdialog/newdialog.component';


const today = new Date();

const month = today.getMonth();

const year = today.getFullYear();

const day = today.getDate();
export class TransactionData{
  constructor(
    public account_Number_of_reciever: string,
    public account_Number_of_sender: string,
    public amount: number,
    public date : string,
    public firstnameOfReciever: string,
    public lastnameOfReciever: string,
    public type_of_transaction: string,
    public currency : string,
    public firstnameOfSender: string,
    public lastnameOfSender: string,

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
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
  
})
export class TransactionTableComponent implements OnInit ,AfterViewInit,OnDestroy {

  animal!: string;
  name!: string;

  @ViewChild(DataTableDirective, {static: false})
  
  dtElement!: DataTableDirective;
 TransactionDatas!: TransactionData[] ;
  CurrentUserData!: UserData;
UserPersonalDataN!: UserPersonalData;
dtoptions: DataTables.Settings={};
dtTrigger: Subject<any>= new Subject <any>();

campaignOne!: FormGroup;

creditdata :  Array<TransactionData>=[];
debitdata :  Array<TransactionData>=[];
allData!: TransactionData[];
// credit ='Green';
// statusClass='Red';
public GButton = 'Credit';
public RButton = 'Debit';
public AButton = 'allTransactions'
public visible = false;
 
 constructor( private auth:AuthService , private _router :Router , private fb : FormBuilder, public dialog: MatDialog){}

range : any ;


 ngOnInit(): void {
   
  // this.statusClass= 'Red';
  // this.credit= 'Green';
  this.GButton = 'Credit';
  this.RButton = 'Debit'; 
  this.AButton ='allTransactions'
  this.dtoptions={
    pagingType:"full_numbers"
  
}


this.range= this.fb.group({
  start :["", Validators.required],
  end: ["", Validators.required]


})

 this.campaignOne = this.fb.group({

   start: new FormControl(),

   end: new FormControl(),

 })




 this.auth.Transactions().subscribe({
    next:(res)=>{
     // alert(res.response)

     this.TransactionDatas = res;
     this.allData= res;
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });

  
     
    console.log(res);
    
      
    },
    error:(err)=>{
      alert(err?.error.response)
    }
  
  })

  

  

 }

 openDialog(): void {
  const dialogRef = this.dialog.open(NewdialogComponent, { 
 
  data: { transactions :  this.allData},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.animal = result;
  });
}

 TransactionTable(){

  this.auth.TransactionHistoryR(this.campaignOne.value).subscribe({
    next:(res)=>{
      this.TransactionDatas= res;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       // Destroy the table first
         dtInstance.destroy();
         // Call the dtTrigger to rerender again
         this.dtTrigger.next(null);
       });
      
     

    console.log(res);
    
      
    },
    error:(err)=>{
      alert(err?.error.response)
    }
  
  })




 }




 myCredits(){
  



var creds = this.allData.filter(s => s.type_of_transaction.toLocaleLowerCase() === 'credit')
this.TransactionDatas = creds;

console.log(this.TransactionDatas);

this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  // Destroy the table first
  dtInstance.destroy();
  // Call the dtTrigger to rerender again
  this.dtTrigger.next(null);
});






 }


myDebits(){

 
    const creds = this.allData.filter(s => s.type_of_transaction.toLocaleLowerCase() === 'debit')
    this.TransactionDatas = creds;
    console.log(this.TransactionDatas);

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
   
    



 }






 async myShowAll(){

  this.TransactionDatas = this.allData;
 

  console.log(this.allData);
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next(null);
  });

 }

 
 ngAfterViewInit(): void {
  this.dtTrigger.next(null);
}

ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
}

toggleLiveDemo() {
  this.visible = !this.visible;
}

handleLiveDemoChange(event: any) {
  this.visible = event;
}


}
