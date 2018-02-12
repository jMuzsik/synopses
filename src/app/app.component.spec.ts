import { TestBed, ComponentFixture, async, tick } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { PostsComponent } from "./posts/posts.component";
import { RouterModule } from "@angular/router";
import { routes } from "./app-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookComponent } from "./book/book.component";
import { LoadingComponent } from "./loading/loading.component";
import { APP_BASE_HREF } from "@angular/common";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import * as utils from "./utils";
import { HttpModule } from "@angular/http";
import { BookService } from "./book.service";
import { HttpClientModule } from "@angular/common/http";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          PostsComponent,
          DashboardComponent,
          BookComponent,
          LoadingComponent
        ],
        imports: [RouterModule.forRoot(routes), HttpModule, HttpClientModule],
        providers: [{ provide: APP_BASE_HREF, useValue: "/" }, BookService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it(
    "should create the app",
    async(() => {
      expect(app).toBeTruthy();
    })
  );
  it(
    "Post button works properly, functions are called, and state is altered properly",
    async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(app.papers.length).toBe(0);
        expect(app.showPaper).toBeFalsy();
        expect(app.newBook).toBeFalsy();
        spyOn(app, "lotsOfPaper").and.callThrough();
        spyOn(app, "postOpen").and.callThrough();

        de = fixture.debugElement.query(By.css("#post-button"));
        el = de.nativeElement;
        el.dispatchEvent(new Event("click"));
        fixture.detectChanges();

        expect(app.lotsOfPaper).toHaveBeenCalledTimes(1);
        expect(app.postOpen).toHaveBeenCalledTimes(1);
        expect(app.papers.length).toBe(20);
        expect(app.showPaper).toBeTruthy();
        expect(app.newBook).toBeTruthy();
      });
    })
  );

  it(
    "Home button works properly, function called",
    async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        spyOn(app, "goToHome");

        de = fixture.debugElement.query(By.css("#home-button"));
        el = de.nativeElement;
        el.dispatchEvent(new Event("click"));
        fixture.detectChanges();

        expect(app.goToHome).toHaveBeenCalledTimes(1);
      });
    })
  );

  it(
    "Renders the post component when the post button is clicked",
    async(() => {
      fixture.whenStable().then(() => {
        de = fixture.debugElement.query(By.css("#post"));
        expect(de).toBeFalsy();

        app.newBook = true;
        fixture.detectChanges();

        de = fixture.debugElement.query(By.css("#post"));
        expect(de).toBeTruthy();
      });
    })
  );
});
