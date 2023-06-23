import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { UserData } from '../../dashboard/dashboard.component';
import { Validators } from '@angular/forms';
import { DomSanitizer,SafeResourceUrl,SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-fundaccount',
  templateUrl: './fundaccount.component.html',
  styleUrls: ['./fundaccount.component.css']
})
export class FundaccountComponent implements OnInit {

  constructor( private auth:AuthService , private _router :Router,private fb : FormBuilder,private sanitizer:DomSanitizer){
    
  }


  
  myUserData!: FormGroup;
  videoUrl!: any;
  // SafeResourceUrl
  public change = false;
  public Tchange = false;

  ngOnInit(): void {

    this.change= true;
    this.Tchange= false;

    this.myUserData= this.fb.group({
      Amount:["",Validators.required]


    })

  }

sendData(){

  this.auth.CreditAccount(this.myUserData.value).subscribe({
    next:(res)=>{
      if (res.status == true){
        // window.open(res.response);
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.response);
      // alert(res.response);
     console.log(res);
     this.change= false;
     this.Tchange= true;

   
      
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


}
