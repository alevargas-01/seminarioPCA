import { Component, OnInit } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';

import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { PostService } from '../services/post.service';
import { Storage } from '@ionic/storage-angular';
import { ModalController } from '@ionic/angular';



defineCustomElements(window);

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.page.html',
  styleUrls: ['./add-post-modal.page.scss'],
  standalone: false,
})
export class AddPostModalPage implements OnInit {
  post_image: any;
  addPostForm: FormGroup;

  formErrors = {
    description: [
      { type: 'required', message: 'La descripción es obligatoria' },
      {
        type: 'minlength',
        message: 'La descripción debe tener al menos 10 caracteres',
      },
    ],
    image: [{ type: 'required', message: 'La imagen es obligatoria' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private storage: Storage,
    private modalController: ModalController
  ) {
    this.addPostForm = this.formBuilder.group({
      description: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(10)])
      ),
      image: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {}

  async uploadPhoto() {
    const uploadPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      quality: 100,
    });

    this.post_image = uploadPhoto.dataUrl;
    this.addPostForm.patchValue({
      image: this.post_image,
    });
  }

  async addPost(post_data: any) {

    const user = await this.storage.get('user');

    const post_params = {
      post: {
        description: post_data.description,
        image: post_data.image,
        user_id: user.id,
      },
    };

    this.postService
      .createPost(post_params)
      .then((response: any) => {
        response.user = {
          id: user.id,
          name: user.name,
          image: user.image || 'assets/img/user.jpg',
        }
        
        this.addPostForm.reset();
        this.post_image = null;
        this.modalController.dismiss({
          null: null,
        });

      })
      .catch((error) => {
        console.log(error);
      });

  }

  closeModal() {
    this.modalController.dismiss({ null: null });
  }
}
