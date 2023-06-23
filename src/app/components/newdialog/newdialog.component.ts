
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface DialogData {
  transactions : []
}

@Component({
  selector: 'app-newdialog',
  templateUrl: './newdialog.component.html',
  styleUrls: ['./newdialog.component.css']
})



export class NewdialogComponent  implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<NewdialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,private auth:AuthService , private fb:FormBuilder
  ) {}

  transactionHistorydata!: FormGroup;
  type_of_transaction !: string;
  customerdata!: FormGroup;


  ngOnInit(): void {
    
    this.customerdata = this.fb.group({
        start:[Date,Validators.required],
        end: [Date,Validators.required],
        currency: ['', Validators.required],
        type_Of_Execution:['']


    })


  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onGeneratePdf(): void{
    this.type_of_transaction= "Pdf"
    
    this.customerdata.controls["type_Of_Execution"].setValue("Pdf");
    this.auth.GenerateState(this.customerdata.value).subscribe({
      next:(res)=>{
    
  
        alert(res.response);
    
       
      console.log(res);
      
        
      },
      error:(err)=>{
        alert(err?.error.response)
      }
    
    })
  
    



    this.dialogRef.close();
  }
  onGenerateExcel():void{
    
    this.customerdata.controls["type_Of_Execution"].setValue("Excel");
    this.auth.GenerateState(this.customerdata.value).subscribe({
      next:(res)=>{
    
  
        alert(res.response);
    
       
      console.log(res);
      
        
      },
      error:(err)=>{
        alert(err?.error.response)
      }
    
    })


    this.dialogRef.close();
}
  onSendEmail():void{
    this.customerdata.controls["type_Of_Execution"].setValue("Email");
    this.auth.GenerateState(this.customerdata.value).subscribe({
      next:(res)=>{
    
        alert(res.response);
      
    
       
      console.log(res);
      
        
      },
      error:(err)=>{
        alert(err?.error.response)
      }
    
    })


    this.dialogRef.close();
}

}
