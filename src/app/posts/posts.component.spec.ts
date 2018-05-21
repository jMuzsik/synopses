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
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("PostsComponent", () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let buttonElement: HTMLElement;
  let button: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostsComponent,
        LoadingComponent,
        DashboardComponent,
        BookComponent,
      ],
      imports: [RouterModule.forRoot(routes), HttpModule, HttpClientModule],
      providers: [{ provide: APP_BASE_HREF, useValue: "/" }, BookService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not show the post while data is being posted(loading)", () => {
    de = fixture.debugElement.query(By.css("#post"));
    expect(de).toBeTruthy();

    component.loading = true;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css("#post"));
    expect(de).toBeFalsy();
  });

  it("should alert the user when post button is pressed, then load after several seconds", done => {
    spyOn(component, "newBook").and.callThrough();
    spyOn(component, "buttonPressed").and.callThrough();

    expect(component.notPressed).toBeTruthy();

    de = fixture.debugElement.query(By.css("#post-button"));
    el = de.nativeElement;

    el.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    expect(component.newBook).toHaveBeenCalledTimes(1);
    expect(component.buttonPressed).toHaveBeenCalledTimes(1);
    expect(component.notPressed).toBeFalsy();
    expect(component.loading).toBeFalsy();
    setTimeout(() => {
      expect(component.loading).toBeTruthy();
      done();
    }, 4000);
  });

  it("bookPreviouslyCreated does what it is supposed to do", () => {
    de = fixture.debugElement.query(By.css(".alert-danger"));
    button = fixture.debugElement.query(By.css(".close"));
    expect(de).toBeNull();
    expect(button).toBeNull();

    component.bookPreviouslyCreated = true;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css(".alert-danger"));
    expect(de).toBeTruthy();

    button = fixture.debugElement.query(By.css(".close"));
    buttonElement = button.nativeElement;
    expect(button).toBeTruthy();

    buttonElement.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css(".alert-danger"));
    expect(de).toBeNull();
  });
});
