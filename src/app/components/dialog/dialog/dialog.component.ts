import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule,MAT_DIALOG_DATA ,} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AccountsComponent } from '../../Accounts/accounts/accounts.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




export interface DialogData {
  currency:string;
  rate :number;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent  implements OnInit{

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData , public auth : AuthService , public fb :FormBuilder) {}

currencyfg !: FormGroup
  ngOnInit(): void {
    this.currencyfg = this.fb.group({

      currency:['',Validators.required]
      
      })

  
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  Sendata(){

  //  this.myUserData.controls["Image"].setValue(this.image);
this.currencyfg.controls["currency"].setValue(this.data.currency);

    this.auth.CreateDomAccount( this.currencyfg.value).subscribe({
      next:(res)=>{
       alert(res.response
        )
      },
      error:(err)=>{
        alert(err?.error.response)
      }
  
  
    })
    this.dialogRef.close();


  }


}
