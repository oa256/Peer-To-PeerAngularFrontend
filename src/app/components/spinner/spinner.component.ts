
import { Component,ViewEncapsulation} from '@angular/core';
import { LoaderServiceService } from 'src/app/services/loader-service.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  encapsulation:ViewEncapsulation.ShadowDom
})
export class SpinnerComponent {


  constructor(public loader : LoaderServiceService){}
}
