import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  submitted = false;

  constructor(private http: HttpClient, router: Router) { }

  onSubmit() { this.submitted = true; }

  newBook(incoming) {
    var data = {
      data: incoming.value
    }

    this.http.post('/api', data, {})
      .subscribe(
      result => {
        // Handle result
        console.log(result)
      },
      error => {
        console.log(error);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
        var urlOfTitle = incoming.value.replace(/ /g, "_");
        this.router.navigate([`/book/${urlOfTitle}`])
        console.log('reroute')
      }
  }

}
