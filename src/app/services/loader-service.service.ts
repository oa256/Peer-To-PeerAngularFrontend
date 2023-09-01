import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderServiceService {

  private laoding :boolean = false;
  constructor() { }


  setLoading(Loading: boolean){
    this.laoding = Loading;


  }

  getLoading(): boolean{

    return this.laoding;

  }

}
