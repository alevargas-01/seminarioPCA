import {Component, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {ModalController} from "@ionic/angular";
import {PostmodalPage} from "../postmodal/postmodal.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  posts: any;

  constructor(
    private postService: PostService,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.postService.getPosts().then((data: any)=>{
      this.posts = data;
    })
  }

  async addPost() {
    const modal = await this.modalController.create({
      component: PostmodalPage,
      componentProps:{}
    });
    return await modal.present();
  }
}
