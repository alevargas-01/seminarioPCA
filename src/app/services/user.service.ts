import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  urlServer = 'http://51.79.26.171';
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private storage: Storage) {}

  profileCreated: EventEmitter<any> = new EventEmitter();

  getUsers(id: any) {
    return new Promise((accept, reject) => {
      this.http
        .get(`${this.urlServer}/current_user/${id}`, {
          headers: this.httpHeaders,
        })
        .subscribe(
          (response: any) => {
            accept(response);
          },
          (error) => {
            console.log(error + +' error');

            if (error.status === 500) {
              reject('Error en el servidor');
            }

            reject('Error al obtener los Usuario');
          }
        );
    });
  }

  updateUser(user: any) {
    const user_params = {
      user,
    };

    return new Promise((accept, reject) => {
      this.http
        .post(`${this.urlServer}/update/${user.id}`, user_params, {
          headers: this.httpHeaders,
        })
        .subscribe(
          (response: any) => {
            accept(response);
          },
          (error) => {
            console.log(error + ' error');

            if (error.status === 500) {
              reject('Error en el servidor');
            }

            reject('Error al actualizar los Usuario');
          }
        );
    });
  }

  updateAccount(user: any) {
    const user_params = {
      user,
    };
    return new Promise((accept, reject) => {
      this.http
        .post(`${this.urlServer}/update/${user.id}`, user_params, {
          headers: this.httpHeaders,
        })
        .subscribe(
          (response: any) => {
            this.storage.set('user', response.user);
            accept(response);
            this.profileCreated.emit(response.user);
          },
          (error) => {
            console.log(error + ' error');

            if (error.status === 500) {
              reject('Error en el servidor');
            }

            reject('Error al actualizar los Usuario');
          }
        );
    });
  }

  listUsers(page: number, perPage: number, query: string = '') {
    const url = `${this.urlServer}/list_users?page=${page}&per_page=${perPage}&query=${query}`;
    return this.http.get(url).toPromise();
  }

  followUser(user_id: any, followee_id: any) {
    const follow_params = {
      followee_id,
    };

    return new Promise((accept, reject) => {
      this.http
        .post(`${this.urlServer}/follow/${user_id}`, follow_params, {
          headers: this.httpHeaders,
        })
        .subscribe(
          (response: any) => {
            accept(response);
          },
          (error) => {
            console.log(error + ' error');

            if (error.status === 500) {
              reject('Error por favor intente mas tarde');
            }

            reject('Error al seguir usuario');
          }
        );
    });
  }
  unfollowUser(user_id: any, followee_id: any) {
    const unfollow_params = {
      followee_id,
    };

    return new Promise((accept, reject) => {
      this.http
        .post(`${this.urlServer}/unfollow/${user_id}`, unfollow_params, {
          headers: this.httpHeaders,
        })
        .subscribe(
          (response: any) => {
            accept(response);
          },
          (error) => {
            console.log(error + ' error');

            if (error.status === 500) {
              reject('Error por favor intente mas tarde');
            }

            reject('Error al dejar de seguir usuario');
          }
        );
    });
  }
}
