import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  constructor(private fb : FormBuilder, private auth:AuthService , private _router :Router){}


ngOnInit(): void {
  this.loginForm = this.fb.group({
    username : ['', Validators.required],
    password : ['', Validators.required],

  })
}
onLogin(){
  if(this.loginForm.valid){

    this.auth.login(this.loginForm.value).subscribe({
      next:(res)=>{
      //  alert(res.response)
        localStorage.setItem('Token',res.response)
        if(res.status){
        this._router.navigate(['/dashboard'])
        }
        else{
          alert(res.response);
          window.location.reload()
        }
      },
      error:(err)=>{
        alert(err?.error.response)
      }


    })
  

  }
  else{

      this.validateAllFormFields(this.loginForm);
      alert("your login details are invalid")
  }
}

private validateAllFormFields(formGroup: FormGroup){
  Object.keys(formGroup.controls).forEach(field =>{
    const control = formGroup.get(field);
    if(control instanceof FormControl){
    control.markAsDirty({onlySelf:true});
    }else if (control instanceof FormGroup){
      this.validateAllFormFields(control)
    }


  })


}

}
