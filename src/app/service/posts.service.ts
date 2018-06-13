import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private _postsSource = new BehaviorSubject<any>([]);
  posts$ = this._postsSource.asObservable();
  
  constructor(private http: HttpClient) {
  }

  getPosts() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(
      (value: any) => {
        this._postsSource.next(value);
      },
      (error: any) => {
        this._postsSource.next([]);
      }
    );
  }

}
