import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage-angular";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage{
  loginForm: FormGroup;
  formErrors = {
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es valido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe ser minimo de 6 caracteres' }
    ]
  };
  errorMessage: any;

  constructor(
    private fb : FormBuilder,
    private authService: AuthService,
    private navCtrl : NavController,
    private storage : Storage
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    })
  }

  loginUser(value: any) {
    this.authService.login(value).then((res:any) => {
      this.errorMessage = '';
      this.storage.set('user', res.user);
      this.storage.set('isUserLoggedIn', true);
      this.navCtrl.navigateForward('/menu/home');
    }).catch((err:any) => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

  irRegister() {
    this.navCtrl.navigateForward('/register');
  }

}
