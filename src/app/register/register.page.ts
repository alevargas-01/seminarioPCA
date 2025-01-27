import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage{

  registerForm: FormGroup;
  formErrors = {
    nombre: [
      { type: 'required', message: 'El nombre es obligatorio' },
    ],
    apellido: [
      { type: 'required', message: 'El apellido es obligatorio' },
    ],
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es valido' }
    ],
    username: [
      { type: 'required', message: 'El nombre de usuario es obligatorio' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe ser minimo de 6 caracteres' }
    ],
    passwordConfirm: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'passwordMismatch', message: 'Las contraseñas no coinciden' }
    ]
  };
  errorMessage: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl : NavController
  ) {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      last_name: new FormControl('', Validators.compose([Validators.required])),
      username: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })

    this.registerForm.valueChanges.subscribe(() => {
      this.validarCoincidenciaPass();
    })
  }

  registerUser(registerData: any){
    this.authService.register(registerData).then(res => {
      console.log(res);
      this.errorMessage = '';
      this.navCtrl.navigateForward('/login');
    }).catch(err => {
      console.log(err);
      this.errorMessage = err;
    });
  }

  regresar() {
    this.navCtrl.navigateForward('/login');
  }

  validarCoincidenciaPass(){
    const pass = this.registerForm.get('password');
    const confirmPass = this.registerForm.get('confirmPassword');

    if(pass?.value !== confirmPass?.value){
      this.registerForm.get('confirmPassword')?.setErrors({passwordMismatch : true})
    }else{
      this.registerForm.get('confirmPassword')?.setErrors(null)
    }

  }
}
