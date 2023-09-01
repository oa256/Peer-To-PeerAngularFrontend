import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-kyc-validation',
  templateUrl: './kyc-validation.component.html',
  styleUrls: ['./kyc-validation.component.css']
})
export class KycValidationComponent implements OnInit {
  ListOfRequiredDocuments :any;
  image: any;
  private base64textString:String="";

  myFile : any;

SenToDb !: FormGroup;
  
  constructor(public auth : AuthService, public fb : FormBuilder ){}

ngOnInit(): void {
  
  this.auth.GetKycDocumentsRequired().subscribe({
    next :value => {
      this.ListOfRequiredDocuments= value;

      console.log(value);



    },
    error(err) {
      
    },




  })



}


handleFileSelect(event:any){
  const file= event.target.files[0];
  var files = event.target.files;


  this.myFile= file;

if (files && file) {
    var reader = new FileReader();

    reader.onload =this._handleReaderLoaded.bind(this);

    reader.readAsBinaryString(file);
}
}

_handleReaderLoaded(readerEvt :any) {
this.base64textString = 'data:image/png;base64,' + btoa(readerEvt.target.result);
console.log(this.base64textString);
this.image=this.base64textString;
}



SendDocument(event:any ,DocumentId :number ){


const id = DocumentId.toString()
const data = new FormData();
data.append("Image", this.myFile);

data.append("DocumentRequiredId",id)

  this.SenToDb = this.fb.group({
    DocumentRequiredId:[DocumentId,Validators.required],
    Image: data



  })

  this.auth.UploadKycFile(data).subscribe({
    next: value => {
      alert(value.response),
      console.log(value)
      window.location.reload()
    },
    error(err) {
      
    },





  })

}

}
