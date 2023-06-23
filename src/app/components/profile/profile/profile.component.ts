import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { UserData } from '../../dashboard/dashboard.component';
import { Validators } from '@angular/forms';
import { error } from 'jquery';
import { empty } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit{
 
  constructor( private auth:AuthService , private _router :Router,private fb : FormBuilder){
    this.myUserData = fb.group({
      firstname: "",
      Lastname: "",
      Phonenumber:"",
      Address: "",
      Image: File
    });
  }

  Userdata:any;
  myUserData!: FormGroup;
 
  image: any;
  Profiledata: any;
  public change = false;
  public Tchange = false;
  public CpassChange =false;
  public Cpchange =false;
  public Uchange= false;
  public SecurityQuestionsIf = false;
  public insertSecurityQuestionsIf = false;
  myUserSecurity!: FormGroup;
  userInsertSecurityQuestion!: FormGroup;
  myQuestionInfo: any;
  data :any;
  private base64textString:String="";
  myUserPassword!: FormGroup;
  myUserPin!:FormGroup;
  bntStyle!: string;
  statusClass = 'Navbutton';
  statusClass1 = 'Navbutton';
  statusClass2 = 'Navbutton';
public Alive = false;
public changetab = true;
public hidetab = true;

  ngOnInit(): void {

    this.change= true;
    this.Tchange= false;
    this.Uchange = true;
    this.statusClass ='Unactiveuser';
    this.statusClass1 ='Navbutton';
    this.statusClass2 ='Navbutton';

     this.myUserPassword= this.fb.group({
      OldPassword: ["",Validators.required],
      NewPassword: ["",Validators.required],
      ConfirmPassword:["",Validators.required] 
     
     
  
     })
     this.myUserPin= this.fb.group({
      OldPin: ["",Validators.required],
      NewPin: ["",Validators.required],
      ConfirmPin:["",Validators.required] 

     })


     this.myUserSecurity = this.fb.group({
      question:["", Validators.required],
      userAnswer:["",Validators.required]

     })

     this.userInsertSecurityQuestion = this.fb.group({
        questions:["", Validators.required],
        userAnswer:["",Validators.required]


     })
     
    this.auth.getUserdetails().subscribe({
      next:(res)=>{
      
       
        this.Profiledata= res;
        this.myUserData.controls["Image"].setValue(this.base64textString);
        console.log(res);
        this.myUserData.controls["firstname"].setValue(res.firstname);
        this.myUserData.controls["Lastname"].setValue(res.lastname);
          this.myUserData.controls["Address"].setValue(res.address);
        this.myUserData.controls["Phonenumber"].setValue(res.phonenumber);
        this.image= res.image;
      
  
      
      
        
      },
      error:(err)=>{
        alert(err?.error.response)
      }
    
    })

   



  }

  Edit(){
    this.auth.CheckForQuestion().subscribe({
      next :(res)=>{
        if (res.status == true){
         
         this.SecurityQuestionsIf = true;
         this.Uchange = false;
         this.myQuestionInfo = res
          //this.Alive =true
          // this.Tchange = true;
          // this.change = false;
          
          }
       else{
        this.data=this.GetQuestion();

        this.insertSecurityQuestionsIf = true;



        this.change = false;

       
        

       }   
      },
      error : (err)=>{

        alert(err?.error.response)
      }




    })




    

  }

  GetQuestion(): string[] {

    let x : any;

    this.auth.GetQuestion().subscribe({
      next :(res)=>{
        
        x= res;
      },
      error : (err)=>{

        alert(err?.error.response)
        x= err?.error.response;
      }

    


    })


    return x;

  }

  GoBack1(){
    this.Tchange = false;
    this.change = true;
    window.location.reload();
  }

  Update(){

     this.myUserData.controls["Image"].setValue(this.image);

     this.auth.UpdateUser(this.myUserData.value).subscribe({
      next:(res)=>{
        if (res.status == true){
        alert(res.response);
        console.log(res);
        window.location.reload();
        
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
  UpdatePassword(){

   

    this.auth.ChangePassword(this.myUserPassword.value).subscribe({
     next:(res)=>{
       if (res.status == true){
       alert(res.response);
       console.log(res);
       window.location.reload();
       
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
 UpdatePin(){
  
  this.auth.ChangePin(this.myUserPin.value).subscribe({
   next:(res)=>{
     if (res.status == true){
     alert(res.response);
     console.log(res);
    window.location.reload();
     
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

  handleFileSelect(event:any){
    const file= event.target.files[0];
    var files = event.target.files;
    

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


ActiveU(){
    window.location.reload();
  this.change= true;
  this.Tchange= false;
  this.Uchange = true;
  this.Cpchange= false;
  this.CpassChange= false;
  this.statusClass1='Navbutton';
  this.statusClass='Unactiveuser';
  this.statusClass2='Navbutton';
  this.SecurityQuestionsIf=false;
  
}
ActivePin(){
  if (this.Alive ==true){
    
  this.change= false;
  this.Tchange= false;
  this.Uchange = false;
  this.Cpchange= true;
  this.CpassChange=false;
  this.statusClass1='Unactiveuser';
  this.statusClass='Navbutton';
  this.statusClass2='Navbutton';
  this.SecurityQuestionsIf=false;
  }
  else{
    this.statusClass1='Unactiveuser';
    this.statusClass='Navbutton';
    this.statusClass2='Navbutton';
    this.change= false;
    this.Tchange= false;
    this.Uchange = false;
    this.CpassChange=false;
    this.Edit();
  }

}
ActivePass(){
   if (this.Alive ==true){
  this.change= false;
  this.Tchange= false;
  this.Uchange = false;
  this.Cpchange=false;
  this.CpassChange=true;
  this.statusClass1='Navbutton';
  this.statusClass='Navbutton';
  this.statusClass2='Unactiveuser';
  this.SecurityQuestionsIf=false;
   }
   else{
    this.statusClass1='Navbutton';
    this.statusClass='Navbutton';
    this.statusClass2='Unactiveuser';
    this.change= false;
    this.Tchange= false;
    this.Uchange = false;
    this.Cpchange=false;
    this.Edit();


   }
}

Securityquest(){

  this.myUserSecurity.controls["question"].setValue(this.myQuestionInfo.response);
  this.auth.CheckAnswer(this.myUserSecurity.value).subscribe({
    next:(res)=>{
      if (res.status == true){
       alert(res.response);
      console.log(res);
      this.Tchange = true;
       this.Uchange = true;
      this.change= false;
      this.SecurityQuestionsIf=false;
      this.Alive = true;
      this.changetab = false;
      this.hidetab = false;
      }

     else{
      alert(res.response);
     }
    },
    error:(err)=>{
      alert(err?.error.response)
    }


  })



}

insertSecurityquest(){


  this.auth.CreateSecurity(this.userInsertSecurityQuestion.value).subscribe({
    next:(res)=>{
      if (res.status == true){
      alert(res.response);
      console.log(res);
     window.location.reload();
      }

     else{
      alert(res.response);
     }
    },
    error:(err)=>{
      alert(err?.error.response)
    }


  })




}


}
