import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../../service/posts.service';
import { CommentsService } from '../../service/comments.service';

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

  constructor(private _postsService: PostsService,
    private _commentsService: CommentsService) { }

  ngOnInit() {
    this._postsService.getPosts();
    this.postsSubscription = this._postsService.posts$.subscribe((value) => {
      this.posts = value
    });

    this._commentsService.getComments();
    this.commentsSubscription = this._commentsService.comments$.subscribe((value) => {
      this.comments = value
    });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
  }

}
