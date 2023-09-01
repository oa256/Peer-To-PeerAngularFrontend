import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog , MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as signalR from "@microsoft/signalr";

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent implements OnInit {
  constructor( public auth : AuthService , public dialogRef: MatDialogRef<NotificationModalComponent>,@Inject(MAT_DIALOG_DATA) public data : any , public fb : FormBuilder){
  }

information : any;

ngOnInit(): void {
  this.information = this.data;




}

}
