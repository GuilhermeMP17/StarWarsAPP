import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StarwarsProvider } from '../../providers/starwars/starwars';
import { Observable } from 'rxjs/Observable';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public character: any = [];
  public characters: any = [];
  public charactersAll: any = [];

  constructor(
    public navCtrl: NavController,
    public starWars: StarwarsProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) { }
  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    let usersObservable: Observable<[any]>;
    usersObservable = this.starWars.getCharacters();

    usersObservable.subscribe(
      data => {
        this.characters = data;
        this.charactersAll = this.characters.results;
      },
      err => {
        this.characters = [];
      }
    )
  }

  loadCharacter(page) {
    let usersObservable: Observable<[any]>;
    usersObservable = this.starWars.getPage(page);

    usersObservable.subscribe(
      data => {
        this.character = data;
        this.showAlert(this.character);
      },
      err => {
        this.character = [];
      }
    )
  }
  nextPage() {
    let usersObservable: Observable<[any]>;
    usersObservable = this.starWars.getPage(this.characters.next);
    usersObservable.subscribe(
      data => {
        this.characters = data;
        this.charactersAll = this.characters.results;
      },
      err => {
        this.characters = [];
      }
    )
  }
  previousPage() {
    let usersObservable: Observable<[any]>;
    usersObservable = this.starWars.getPage(this.characters.previous);

    usersObservable.subscribe(
      data => {
        this.characters = data;
        this.charactersAll = this.characters.results;
      },
      err => {
        this.characters = [];
      }
    )
  }
  showAlert(obj) {
    let alert = this.alertCtrl.create({
      title: obj.name,
      subTitle: 'Altura: ' + obj.height +
      '<br>Peso: ' + obj.mass +
      '<br>Cor dos olhos: ' + obj.eye_color +
      '<br>Genêro: ' + obj.gender,
      buttons: ['OK']
    });
    alert.present();
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

}
