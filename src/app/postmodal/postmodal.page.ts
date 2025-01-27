import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {defineCustomElements} from '@ionic/pwa-elements/loader';
import {PostService} from "../services/post.service";
import {Storage} from "@ionic/storage-angular";
import {ModalController} from "@ionic/angular";

defineCustomElements(window);

@Component({
  selector: 'app-postmodal',
  templateUrl: './postmodal.page.html',
  styleUrls: ['./postmodal.page.scss'],
  standalone: false
})
export class PostmodalPage{

  addPostForm: FormGroup;
  post_image: any;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private storage : Storage,
    private modalController: ModalController
  ) {
    this.addPostForm = this.fb.group({
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  async subirFoto() {
    const foto = await Camera.getPhoto({
      quality : 100,
      source : CameraSource.Photos,
      resultType : CameraResultType.DataUrl
    })
    this.post_image = foto.dataUrl;
    this.addPostForm.patchValue({
      image : this.post_image
    })
  }

  async agregarPost(data : any) {
    const user = await this.storage.get('user');

    const post_param = {
      post: {
        description: data.description,
        image: data.image,
        user_id: user.id
      }
    }

    this.postService.createPost(post_param).then(data => {
      console.log('Post creado',data);
      this.modalController.dismiss();
    }).catch(error => {
      console.error('error',error)
    })

  }
}
