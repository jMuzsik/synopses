import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { APP_BASE_HREF } from '@angular/common';

import { BookComponent } from "./book.component";

import { ActivatedRoute } from "@angular/router";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

import { routes } from "../app-routing.module";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { BookService } from "../book.service";
import { componentFactoryName } from "@angular/compiler";

describe("BookComponent", () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [BookComponent, DashboardComponent],
        imports: [RouterModule.forRoot(routes), HttpModule],
        providers: [{ provide: APP_BASE_HREF, useValue: "/" }, BookService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
