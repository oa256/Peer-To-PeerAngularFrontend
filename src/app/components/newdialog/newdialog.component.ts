
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
  currenciesFromBackend=[];

  ngOnInit(): void {
    
    this.customerdata = this.fb.group({
        start:[Date,Validators.required],
        end: [Date,Validators.required],
        currency: ['', Validators.required],
        type_Of_Execution:['']


    })



    this.auth.GetMyCurrencies().subscribe({
      next:(res)=>{

      this.currenciesFromBackend= res;

      console.log(res);
      },
      error:(err)=>{
        alert(err?.error.response)

      }

    })
  

  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  

  // onGenerateFile(): void{

  //   this.auth.GenerateState(this.customerdata.value).subscribe(
  //   res=>{
  //   let blob: Blob = res.body as blob;

  //       // if((res.response =="Email has been sent")){
  //       //   alert(res.response);
  
  //       // }
  //       // else{
  //      // this.downloadFile(res);
  //       // }
       
  //     console.log(res);
      
        
  //     }),
  //     error:(err)=>{
  //       alert(err?.error.response)
  //     }
    
  //   })
  
    



  //   this.dialogRef.close();
  // }
onGenerateFile(){
if ( (this.customerdata.value["type_Of_Execution"]=="Pdf")||(this.customerdata.value["type_Of_Execution"]=="Excel") ){
  this.auth.GenerateStateDownload(this.customerdata.value).subscribe(res =>{
    let blob: Blob = res.body as Blob;
    let Url = window.URL.createObjectURL(blob)
   // window.open(Url);
   let a = document.createElement('a');
   a.download = "Statement";
   a.href = Url;
   a.click()
  })

}

else{
this.auth.GenerateStateEmail(this.customerdata.value).subscribe({
next:(value)=>{
  alert(value.response) ;


  console.log(value.response);

},

error:(err)=> {
  alert(err?.error.response)
},


})



}
this.dialogRef.close();

}
  
  
  // downloadFile(data: any) {

  //   let blob:Blob = data.body as 
  //   // const blob = new Blob([data]);
  //   const url= window.URL.createObjectURL(blob);
  //   window.open(url);
  // }



//   onGenerateExcel():void{
    
//     // this.customerdata.controls["type_Of_Execution"].setValue("Excel");
//     this.auth.GenerateState(this.customerdata.value).subscribe({
//       next:(res)=>{
    
  
//         alert(res.response);
    
       
//       console.log(res);
      
        
//       },
//       error:(err)=>{
//         alert(err?.error.response)
//       }
    
//     })


//     this.dialogRef.close();
// }
//   onSendEmail():void{
//     // this.customerdata.controls["type_Of_Execution"].setValue("Email");
//     this.auth.GenerateState(this.customerdata.value).subscribe({
//       next:(res)=>{
    
//         alert(res.response);
      
    
       
//       console.log(res);
      
        
//       },
//       error:(err)=>{
//         alert(err?.error.response)
//       }
    
//     })


//     this.dialogRef.close();
// }

}
