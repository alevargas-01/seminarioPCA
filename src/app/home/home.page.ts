import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { ModalController } from '@ionic/angular';
import { AddPostModalPage } from '../add-post-modal/add-post-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  posts: any[] = [];
  page: number = 1;
  limit: number = 10;
  hasMore: boolean = true;

  isLoading: boolean = false;

  constructor(
    private postService: PostService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadPost();
    this.postService.postCreated.subscribe((newPost:any) => {
      console.log('111');
      console.log(newPost);
      this.posts.unshift(newPost);
      console.log('222');
      console.log(this.posts);
    })
  }

  async addPost() {
    const modal = await this.modalController.create({
      component: AddPostModalPage,
      componentProps: {},
    });

    return await modal.present();
  }

  loadPost(event?: any) {

    this.isLoading = true;
    this.postService.getPosts(this.page, this.limit).then(
      (response: any) => {
        if (response.length > 0) {
          this.posts = [...this.posts, ...response];
          this.page++;
        } else {
          this.hasMore = false;
        }

        this.isLoading = false;

        if (event) {
          event.target.complete();
        }
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        if (event) {
          event.target.complete();
        }
      }
    );
  }
}
