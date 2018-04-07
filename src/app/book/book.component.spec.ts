import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { APP_BASE_HREF } from "@angular/common";

import { BookComponent } from "./book.component";

import { ActivatedRoute } from "@angular/router";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

import { routes } from "../app-routing.module";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { BookService } from "../book.service";
import { componentFactoryName } from "@angular/compiler";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("BookComponent", () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let de: DebugElement;
  let deArr: Array<DebugElement>;
  let el: HTMLElement;
  let tempDe: DebugElement;
  let tempEl: HTMLElement;
  let clickEl: HTMLElement;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [BookComponent, DashboardComponent],
        imports: [RouterModule.forRoot(routes), HttpModule],
        providers: [{ provide: APP_BASE_HREF, useValue: "/" }, BookService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    // Some form of error if this is run...
    // fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // it("by default loading should happen until data is available", () => {
  //   async(() => {
  //     de = fixture.debugElement.query(By.css(".jawn"));
  //     expect(de).toBeTruthy();
  //     de = fixture.debugElement.query(By.css(".card"));
  //     expect(de).toBeNull();

  //     component.isDataAvailable = true;
  //     fixture.detectChanges();

  //     fixture.whenStable().then(() => {
  //       de = fixture.debugElement.query(By.css(".jawn"));
  //       expect(de).toBeNull();
  //       de = fixture.debugElement.query(By.css(".card"));
  //       console.log(de);
  //       expect(de).toBeTruthy();

  //     })
  //   });
  // });

  // it("by default the book card should be shown, when button is clicked the author card should be shown and vice versa", () => {
  //   fixture.whenStable().then(() => {
  //     async(() => {
  //       component.isDataAvailable = true;
  //       fixture.detectChanges();

  //       deArr = fixture.debugElement.queryAll(By.css(".nav-link"));
  //       console.log(deArr);
  //       expect(deArr.length).toBe(2);

  //       tempDe = fixture.debugElement.query(By.css(".book"));
  //       expect(tempDe).toBeTruthy();
  //       tempDe = fixture.debugElement.query(By.css(".author"));
  //       expect(tempDe).toBeNull();

  //       clickEl = deArr[1].nativeElement;
  //       clickEl.dispatchEvent(new Event("click"));
  //       fixture.detectChanges();

  //       tempDe = fixture.debugElement.query(By.css(".author"));
  //       expect(tempDe).toBeTruthy();
  //       tempDe = fixture.debugElement.query(By.css(".book"));
  //       expect(tempDe).toBeNull();

  //       clickEl = deArr[0].nativeElement;
  //       clickEl.dispatchEvent(new Event("click"));
  //       fixture.detectChanges();

  //       tempDe = fixture.debugElement.query(By.css(".book"));
  //       expect(tempDe).toBeTruthy();
  //       tempDe = fixture.debugElement.query(By.css(".author"));
  //       expect(tempDe).toBeNull();
  //     });
  //   });
  // });
});
