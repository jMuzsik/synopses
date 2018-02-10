import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardComponent } from "./dashboard.component";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { routes } from "../app-routing.module";
import { BookComponent } from "../book/book.component";
import { APP_BASE_HREF } from "@angular/common";
import { BookService } from "../book.service";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

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
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
