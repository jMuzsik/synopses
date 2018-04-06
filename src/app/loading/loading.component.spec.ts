import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoadingComponent } from "./loading.component";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("LoadingComponent", () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let de: DebugElement;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LoadingComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should only truly exist when there is book data, by default it ought to exist", () => {
    de = fixture.debugElement.query(By.css(".book"));
    expect(de).toBeTruthy();

    component.books = [];
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css(".book"));
    expect(de).toBeNull();
  });
});
