import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { CommentsService } from '../../services/comments.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, OnDestroy {

  postsSubscription: Subscription;
  detailPosts = {};

  commentsSubscription: Subscription;
  detailComments = {};

  usersSubscription: Subscription;
  detailUsers = {};

  constructor(private _postsService: PostsService,
    private _commentsService: CommentsService,
    private _usersService: UsersService) { }

  fillPosts(value) {
    this.detailPosts = {
      title: `${value.length} POSTS`,
      url: '/posts',
      urlText: 'See All'
    };
  }

  fillComments(value) {
    this.detailComments = {
      title: `${value.length} COMMENTS`,
      url: '/comments',
      urlText: 'See All'
    };
  }

  fillUsers(value) {
    this.detailUsers = {
      title: `${value.length} USERS`,
      url: '/users',
      urlText: 'See All'
    };
  }

  ngOnInit() {
    this._postsService.getPosts();
    this.postsSubscription = this._postsService.posts$.subscribe((value) => {
      this.fillPosts(value);
    });

    this._commentsService.getComments();
    this.commentsSubscription = this._commentsService.comments$.subscribe((value) => {
      this.fillComments(value);
    });

    this._usersService.getUsers();
    this.usersSubscription = this._usersService.users$.subscribe((value) => {
      this.fillUsers(value);
    });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }

}
