import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SingleService {

  private _postSource = new BehaviorSubject<any>({});
  post$ = this._postSource.asObservable();

  constructor(private http: HttpClient) { }

  getPost(id: number) {
    this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`).subscribe(
      (value: any) => {
        this._postSource.next(value);
      },
      (error: any) => {
        this._postSource.next([]);
      }
    );
  }

}
