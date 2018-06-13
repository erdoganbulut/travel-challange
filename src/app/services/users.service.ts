import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _usersSource = new BehaviorSubject<any>([]);
  users$ = this._usersSource.asObservable();

  constructor(private http: HttpClient) { }

  getUsers() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(
      (value: any) => {
        this._usersSource.next(value);
      },
      (error: any) => {
        this._usersSource.next([]);
      }
    );
  }

}
