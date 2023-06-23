import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  constructor( private auth:AuthService , private _router :Router,private fb : FormBuilder){
    
  }

  myUserData!: FormGroup;
  ResetPasswordForm!: FormGroup;

  ngOnInit(): void {
    
    this.ResetPasswordForm = this.fb.group({

      userDetail: ['', Validators.required]


    })



  }

  resetPassword(){

    this.auth.ResetPassword(this.ResetPasswordForm.value).subscribe({
      next :(res)=>{
        if(res.status){
          alert(res.response);
          this._router.navigate(['/login'])
          // window.location.reload();

        }
        else {
          alert(res.response);
        }

      },
      error : (err)=>{

        
        alert(err?.error.response)
      }



    })




  }




}
