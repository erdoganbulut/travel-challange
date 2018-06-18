import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../types/post.type';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private _postsSource = new BehaviorSubject<Post[]>([]);
  posts$ = this._postsSource.asObservable();

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(
      (value: Post[]) => {
        this._postsSource.next(value);
      },
      (error: any) => {
        this._postsSource.next([]);
      }
    );
  }

}
