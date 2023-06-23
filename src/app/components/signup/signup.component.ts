import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

signUpForm!: FormGroup;
constructor(private fb : FormBuilder,private auth:AuthService , private _router :Router){


}

ngOnInit(): void {
  
this.signUpForm = this.fb.group({

firstName:['',Validators.required],
lastName:['',Validators.required],
username:['',Validators.required],
email:['',Validators.required],
password:['',Validators.required],
confirmPassword:['',Validators.required],
phoneNumber:['',Validators.required],
Address: ['',Validators.required]
})
}



  onsignup(){
    if(this.signUpForm.valid){

      this.auth.signup(this.signUpForm.value).subscribe({
        next:(res)=>{
          if (res.status == true){
          alert(res.response)
          this._router.navigate(['/login'])
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
    else{
      console.log(this.signUpForm.value)
  
    }
  }



}

