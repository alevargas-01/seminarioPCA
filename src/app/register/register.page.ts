import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: any;

  formErrors = {
    user: [{ type: 'required', message: 'El usuario es obligatorio' }],
    name: [{ type: 'required', message: 'El nombre es obligatorio' }],
    lastname: [{ type: 'required', message: 'El apellido es obligatorio' }],
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es valido' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      {
        type: 'minlength',
        message: 'La contraseña debe tener al menos 6 caracteres',
      },
    ],
    passwordConfirmation: [
      {
        type: 'required',
        message: 'La confirmación de la contraseña es obligatoria',
      },
      {
        type: 'minlength',
        message:
          'La confirmación de la contraseña debe tener al menos 6 caracteres',
      },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.registerForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  ngOnInit() {}

  registerUser(credentials: any) {

    this.authService
      .register(credentials)
      .then((response) => {
        console.log(response);
        this.errorMessage = '';
        this.navCtrl.navigateForward('/login');
      })
      .catch((error) => {
        console.log(error, ' error');
        this.errorMessage = error;
      });
  }

  resetLogin(){
    this.navCtrl.navigateForward('/login');
  }
}
