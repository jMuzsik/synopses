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

  newBook(title, author) {
    var data = {
      title: title.value,
      author: author.value
    }

    this.http.post('/api', data, {})
      .subscribe(
      result => {
        // Handle result
        console.log("DOES THIS HAPPEN IN POST COMPONENT?", result)
      },
      error => {
        console.log(error);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
        var urlOfTitle = title.value.replace(/ /g, "_");
        this.router.navigate([`/book/${urlOfTitle}`])
        console.log('reroute')
      }
  }

}
