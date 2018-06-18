import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../types/post.type';

@Injectable({
  providedIn: 'root'
})
export class SingleService {

  post: Post = {
    id: null,
    userId: null,
    body: null,
    title: null,
  };

  private _postSource = new BehaviorSubject<Post>(this.post);
  post$ = this._postSource.asObservable();

  constructor(private http: HttpClient) { }

  getPost(id: number) {
    this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`).subscribe(
      (value: Post) => {
        this._postSource.next(value);
      },
      (error: any) => {
        this._postSource.next(this.post);
      }
    );
  }

}
