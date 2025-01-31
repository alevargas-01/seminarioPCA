import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class PostService {
  urlServer = 'http://51.79.26.171';
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  postCreated: EventEmitter<any> = new EventEmitter();

  getPosts(page: number, perPage: number) {

    return new Promise((accept, reject) => {

      this.http.get(`${this.urlServer}/posts?page=${page}&perPage=${perPage} `, { headers: this.httpHeaders }).subscribe(
        (response: any) => {
          accept(response);
        },
        (error) => {
          console.log(error + + ' error');

          if (error.status === 500) {
            reject('Error en el servidor');
          }

          reject('Error al obtener los Posts');
        }
      );

    });

  }

  createPost(post_data:  any) {

    return new Promise((accept, reject) => {
      this.http.post(`${this.urlServer}/posts`, post_data, {headers: this.httpHeaders,}).subscribe(
          (response: any) => {
            accept(response);
            
            this.postCreated.emit(response);
          },
          (error) => {
            console.log(error + ' error');

            if (error.status === 500) {
              reject('Error en el servidor');
            }

            reject('Error al crear el Post');
          }
        );
    });

  }


}
