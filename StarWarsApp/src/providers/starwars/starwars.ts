import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular';
/*
  Generated class for the StarwarsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StarwarsProvider {

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController
  ) { }

  getCharacters(): Observable<any> {
    this.presentLoading();
    return this.http.get('https://swapi.co/api/people');
  }
  getPage(string): Observable<any> {
    this.presentLoading();
    return this.http.get(string);
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    loader.present();
  }
}
