import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { UserData } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit{

  constructor( private auth:AuthService , private _router :Router,private fb : FormBuilder){}

  Userdata:any;
  myUserData!: FormGroup;
   image: any;
  Profiledata: any;
  public change = true;
  public Tchange = false;

  ngOnInit(): void {

    
this.auth.getUserdetails().subscribe({
      next:(res)=>{
      
       
        // this.myUserData = this.fb.group({

        //   firstname:res.firstname,
        //   Lastname: res.lastname,
          
        //   Email:res.email,
        //   Phonenumber:res.phonenumber,
        
          
        //   })
        this.Profiledata= res;
          this.image= res.image;
      
  
       console.log(res);
      
        
      },
      error:(err)=>{
        alert(err?.error.response)
      }
    
    })





  }



}
