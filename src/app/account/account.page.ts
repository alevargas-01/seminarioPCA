import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Storage} from "@ionic/storage-angular";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {defineCustomElements} from '@ionic/pwa-elements/loader';
import {MenuController, NavController} from "@ionic/angular";

defineCustomElements(window);

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {

  user_data: any = {
    name: '',
    email: '',
    image: '',
    followed_users: [],
    following_users: []
  };

  constructor(
    private menuController: MenuController,
    private userService : UserService,
    private storage : Storage,
    private navCtrl: NavController,
  ) { }

  async ngOnInit() {
    await this.menuController.close();
    let usuario = await this.storage.get('user');
    this.userService.getUser(usuario.id).then(data => {
      this.storage.set('user', data);
      this.user_data = data;
    }).catch(error => {
      console.error(error);
    })
  }

  async tomarFoto() {
    const foto = await Camera.getPhoto({
      quality : 100,
      source : CameraSource.Camera,
      resultType : CameraResultType.DataUrl
    })

    this.user_data.image = foto.dataUrl;

    await this.actualizarUsuario();
  }

  async actualizarUsuario() {
    this.userService.updateUser(this.user_data).then(data => {
      console.log(data);
    }).catch(error => {
      console.error(error);
    })
  }

  regresar() {
    this.navCtrl.navigateBack('menu/home');
  }
}
