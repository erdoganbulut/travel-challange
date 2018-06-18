import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { Post } from '../../types/post.type';
import { User } from '../../types/user.type';
import { PostsService } from '../../services/posts.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersDetail = [];

  posts: Post[];
  postsSubscription: Subscription;

  users: User[];
  usersSubscription: Subscription;

  constructor(private _postsService: PostsService,
    private _usersService: UsersService) { }

  fillDetail() {
    if (this.posts
    && this.users
    && this.posts.length > 0
    && this.users.length > 0) {
      let detail = [];
      this.users.forEach(element => {
        let posts = _.filter(this.posts, { 'userId': element.id });
        let user = JSON.parse(JSON.stringify(element))
        user.posts = posts
        detail.push(user);
      });
      this.usersDetail = detail;
      console.log(this.usersDetail)
    }
  }

  ngOnInit() {
    this._postsService.getPosts();
    this.postsSubscription = this._postsService.posts$.subscribe((posts) => {
      this.posts = posts;
      this.fillDetail();
    });

    this._usersService.getUsers();
    this.usersSubscription = this._usersService.users$.subscribe((user) => {
      this.users = user;
      this.fillDetail();
    });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }

}
