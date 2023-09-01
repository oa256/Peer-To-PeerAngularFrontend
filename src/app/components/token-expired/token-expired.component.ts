import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-token-expired',
  templateUrl: './token-expired.component.html',
  styleUrls: ['./token-expired.component.css']
})
export class TokenExpiredComponent {
constructor(private _router :Router,){}

  redirectToLogin(){
    this._router.navigate(["/login"])

  }

}
