import { Component , OnInit } from '@angular/core';
import { SignalrService } from './services/service/signalr.service';
import { HttpClient } from '@microsoft/signalr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'AngularAuthUI';


//   constructor( public signalRService : SignalrService ,private http: HttpClient){}
// ngOnInit(): void {
  
// this.signalRService.startConnection();


}



// private startHttpRequest = () => {
//   this.http.get('https://localhost:5001/api/chart')
//     .subscribe(res => {
//       console.log(res);
//     })
// }


