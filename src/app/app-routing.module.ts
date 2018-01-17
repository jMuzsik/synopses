import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookComponent } from './book/book.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'book/:title', component: BookComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
