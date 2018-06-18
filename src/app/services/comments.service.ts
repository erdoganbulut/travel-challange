import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../types/comment.type';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private _commentsSource = new BehaviorSubject<Comment[]>([]);
  comments$ = this._commentsSource.asObservable();

  constructor(private http: HttpClient) { }

  getComments() {
    this.http.get('https://jsonplaceholder.typicode.com/comments').subscribe(
      (value: Comment[]) => {
        this._commentsSource.next(value);
      },
      (error: any) => {
        this._commentsSource.next([]);
      }
    );
  }

}
