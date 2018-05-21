import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { APP_BASE_HREF } from "@angular/common";

import { HttpModule, RequestOptions, XHRBackend, Http } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { PostsComponent } from "./posts/posts.component";
import { BookComponent } from "./book/book.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookService } from "./book.service";
import { LoadingComponent } from "./loading/loading.component";

import * as bootstrap from "bootstrap";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    BookComponent,
    DashboardComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [
    BookService,
    {
      provide: Http,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) =>
        new Http(backend, defaultOptions),
      deps: [XHRBackend, RequestOptions],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
