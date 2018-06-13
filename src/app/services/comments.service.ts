import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private _commentsSource = new BehaviorSubject<any>([]);
  comments$ = this._commentsSource.asObservable();
  
  constructor(private http: HttpClient) {
  }

  getComments() {
    this.http.get('https://jsonplaceholder.typicode.com/comments').subscribe(
      (value: any) => {
        this._commentsSource.next(value);
      },
      (error: any) => {
        this._commentsSource.next([]);
      }
    );
  }

}
