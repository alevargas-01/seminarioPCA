import { Component } from '@angular/core';
import {MenuController, NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false
})
export class MenuPage {

  constructor(private menuController: MenuController, private storage : Storage, private navCtrl: NavController) { }

  async closeMenu() {
    await this.menuController.close();
  }

  logOut() {
    this.storage.clear()
    this.navCtrl.navigateForward('/login');
  }

}
