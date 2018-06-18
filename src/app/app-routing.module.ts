import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './routes/start/start.component';
import { PostsComponent } from './routes/posts/posts.component';
import { SingleComponent } from './routes/single/single.component';
import { CommentsComponent } from './routes/comments/comments.component';
import { UsersComponent } from './routes/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
  },
  {
    path: 'posts',
    component: PostsComponent,
  },
  {
    path: 'posts/:id',
    component: SingleComponent,
  },
  {
    path: 'comments',
    component: CommentsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
