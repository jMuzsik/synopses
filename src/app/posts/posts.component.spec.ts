import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PostsComponent } from "./posts.component";
import { LoadingComponent } from "../loading/loading.component";
import { RouterModule } from "@angular/router";
import { routes } from "../app-routing.module";
import { HttpModule } from "@angular/http";
import { BookService } from "../book.service";
import { APP_BASE_HREF } from "@angular/common";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { BookComponent } from "../book/book.component";
import { HttpClientModule } from "@angular/common/http";

describe("PostsComponent", () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          PostsComponent,
          LoadingComponent,
          DashboardComponent,
          BookComponent
        ],
        imports: [RouterModule.forRoot(routes), HttpModule, HttpClientModule],
        providers: [{ provide: APP_BASE_HREF, useValue: "/" }, BookService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
