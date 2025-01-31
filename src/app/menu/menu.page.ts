import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {

  user: any = {};

  constructor(
    private menu: MenuController,
    private navCrtl: NavController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    this.user = await this.storage.get('user');
  }

  closeMenu() {
    this.menu.close();
  }

  logOut() {
    this.storage.remove('isUserLoggedIn');
    this.navCrtl.navigateRoot('/login');
    this.closeMenu();
  }

  searchUser() {
    this.navCrtl.navigateRoot('/menu/search-users');
    this.closeMenu();
  }

  account() {
    this.navCrtl.navigateRoot('/menu/account');
    this.closeMenu();
  }

  home() {
    this.navCrtl.navigateRoot('/menu/home');
    this.closeMenu();
  }
}
