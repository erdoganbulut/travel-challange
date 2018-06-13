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

  posts: any[];
  postsSubscription: Subscription;

  comments: any[];
  commentsSubscription: Subscription;

  users: any[];
  usersSubscription: Subscription;

  constructor(private _postsService: PostsService,
    private _commentsService: CommentsService,
    private _usersService: UsersService) { }

  ngOnInit() {
    this._postsService.getPosts();
    this.postsSubscription = this._postsService.posts$.subscribe((value) => {
      this.posts = value
    });

    this._commentsService.getComments();
    this.commentsSubscription = this._commentsService.comments$.subscribe((value) => {
      this.comments = value
    });

    this._usersService.getUsers();
    this.usersSubscription = this._usersService.users$.subscribe((value) => {
      this.users = value
    });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }

}
