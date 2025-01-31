import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.page.html',
  styleUrls: ['./search-users.page.scss'],
  standalone: false,
})
export class SearchUsersPage implements OnInit {
  users: any[] = [];
  page: number = 1;
  limit: number = 10;
  query: string = '';
  hasMoreUsers: boolean = true;
  current_user: any;

  constructor(private userService: UserService, private storage: Storage) {}

  ngOnInit() {
    this.loadUser();
  }

  async loadUser(event?: any) {
    this.current_user = await this.storage.get('user');
    const followingUser = this.current_user.followees || [];

    this.userService
      .listUsers(this.page, this.limit, this.query)
      .then((response: any) => {
        if (response.users.length > 0) {
          const updateUser = response.users.map((user: any) => ({
            ...user,
            is_following: followingUser.some(
              (followedUser: any) => followedUser.id == user.id
            ),
          }));

          this.users = [...this.users, ...updateUser];
          this.page++;
        } else {
          this.hasMoreUsers = false;
        }

        if (event) {
          event.target.complete();
        }
      })
      .catch((error) => {
        console.log(error);
        event.target.complete();
      });
  }

  searchUser(event?: any) {
    this.query = event.target.value || '';
    this.page = 1;
    this.users = [];
    this.hasMoreUsers = true;
    this.loadUser();
  }

  follow(followee_id: any) {
    const user_id = this.current_user.id;
    this.userService
      .followUser(user_id, followee_id)
      .then((data: any) => {

        this.users = this.users.map((user: any) => {
          if (user.id == followee_id) {
            return {
              ...user,
              is_following: true,
            };
          }
          return user;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  unfollow(followee_id: any) {
    const user_id = this.current_user.id;
    this.userService
      .unfollowUser(user_id, followee_id)
      .then((data: any) => {
        
        this.users = this.users.map((user: any) => {
          if (user.id == followee_id) {
            return {
              ...user,
              is_following: false,
            };
          }
          return user;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleFollow(user: any) {

    if (user.is_following) {
      this.unfollow(user.id);
    } else {
      this.follow(user.id);
    }
  }
}
