import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { DashboardComponent } from "./dashboard.component";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { routes } from "../app-routing.module";
import { BookComponent } from "../book/book.component";
import { APP_BASE_HREF } from "@angular/common";
import { BookService } from "../book.service";
import { decode } from "@angular/router/src/url_tree";
import { HttpClientModule } from "@angular/common/http";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let img: string;
  let data: Array<any>;
  let debugArr: Array<DebugElement>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [BookComponent, DashboardComponent],
        imports: [RouterModule.forRoot(routes), HttpModule, HttpClientModule],
        providers: [{ provide: APP_BASE_HREF, useValue: "/" }, BookService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    img =
      "http://imgsrc.hubblesite.org/hvi/uploads/image_file/image_attachment/30052/STSCI-H-p1720b-t-400x400.png";

    data = [
      {
        exact_title: "11111",
        front_cover: img,
        goodreads_description: "<h1>1</h1>",
        url_title: "url_1",
      },
      {
        exact_title: "21222",
        front_cover: img,
        goodreads_description: "<h1>2</h1>",
        url_title: "url_2",
      },
      {
        exact_title: "33333",
        front_cover: img,
        goodreads_description: "<h1>3</h1>",
        url_title: "url_3",
      },
      {
        exact_title: "44444",
        front_cover: img,
        goodreads_description: "<h1>4</h1>",
        url_title: "url_4",
      },
      {
        exact_title: "51555",
        front_cover: img,
        goodreads_description: "<h1>5</h1>",
        url_title: "url_5",
      },
      {
        exact_title: "66666",
        front_cover: img,
        goodreads_description: "<h1>6</h1>",
        url_title: "url_6",
      },
      {
        exact_title: "77777",
        front_cover: img,
        goodreads_description: "<h1>7</h1>",
        url_title: "url_7",
      },
    ];
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.books = data;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should show loading view(jawn class) when data is not available", () => {
    //WHEN DATA IS LOADING, DATA NOT AVAILABLE YET
    de = fixture.debugElement.query(By.css(".jawn"));
    expect(de).toBeTruthy();

    //WHEN DATA IS AVAILABLE
    component.dataAvailable = true;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css("#input-box"));
    expect(de).toBeTruthy();
    de = fixture.debugElement.query(By.css(".jawn"));
    expect(de).toBeNull();
  });

  it(
    "fillOutGrid() functionality and fuzzy search expectations when user searches for a book",
    async(() => {
      fixture.whenStable().then(() => {
        // BEFORE USER SEARCHES FOR A BOOK THERE SHOULD BE NO CARDS ON THE PAGE
        component.dataAvailable = true;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css(".card"));
        expect(de).toBeNull();

        // WHEN USER BEGINS TO LOOK, NO MATTER HOW MANY RESULTS FROM THE FUZZY SEARCH THERE SHOULD BE 5 CARDS
        let input: DebugElement = fixture.debugElement.query(By.css("input"));
        let el: any = input.nativeElement;

        //CHECK FOR EXACT QUERY
        el.value = "11111";
        el.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        debugArr = fixture.debugElement.queryAll(By.css(".card"));

        expect(debugArr.length).toBe(5);

        expect(component.filteredItems[0]).toBe(0);
        //HIDE EXISTS ON ALL CARDS THAT DO NOT HAVE A BOOK OBJECT ASSOCIATED
        expect(debugArr[0].attributes.id).toBe("hide");
        expect(component.filteredItems[1]).toBe(0);
        expect(debugArr[1].attributes.id).toBe("hide");
        //RESULT[0] OF FUZZY SEARCH IS FILTEREDITEMS[2]
        expect(component.filteredItems[2].exact_title).toBe("11111");
        expect(debugArr[2].attributes.id).toBe(undefined);
        expect(component.filteredItems[3]).toBe(0);
        expect(debugArr[3].attributes.id).toBe("hide");
        expect(component.filteredItems[4]).toBe(0);
        expect(debugArr[4].attributes.id).toBe("hide");

        //CHECK A FUZZIER QUERY
        el.value = "1";
        el.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        debugArr = fixture.debugElement.queryAll(By.css(".card"));

        expect(debugArr.length).toBe(5);

        expect(component.filteredItems[0]).toBe(0);
        expect(debugArr[0].attributes.id).toBe("hide");
        //RESULT[0] OF FUZZY SEARCH IS FILTEREDITEMS[2]
        expect(component.filteredItems[1].exact_title).toBe("21222");
        expect(debugArr[1].attributes.id).toBe(undefined);
        //RESULT[1] OF FUZZY SEARCH IS FILTEREDITEMS[1]
        expect(component.filteredItems[2].exact_title).toBe("11111");
        expect(debugArr[2].attributes.id).toBe(undefined);
        //RESULT[2] OF FUZZY SEARCH IS FILTEREDITEMS[3]
        expect(component.filteredItems[3].exact_title).toBe("51555");
        expect(debugArr[3].attributes.id).toBe(undefined);
        expect(component.filteredItems[4]).toBe(0);
        expect(debugArr[4].attributes.id).toBe("hide");
      });
    })
  );

  it(
    "Properly reroutes when the image is clicked",
    async(() => {
      fixture.whenStable().then(() => {
        spyOn(component, "reroute");
        component.dataAvailable = true;
        fixture.detectChanges();
        //FIRST SET UP THE PAGE WITH CARDS SO SOMETHING CAN BE CLICKED, THIS ONLY HAS THE ONE CARD AT POSITION 2 AS SHOWN IN LAST TEST
        let input: DebugElement = fixture.debugElement.query(By.css("input"));
        let el: any = input.nativeElement;
        el.value = "11111";
        el.dispatchEvent(new Event("input"));

        fixture.detectChanges();
        //NOW GRAB THE ONLY CLICK ELEMENT AVAILABLE ON THE PAGE, EVEN HIDDEN ELEMENTS HAVE THIS CLASS, SO GRAB BY DIFFERENT ALT
        debugArr = fixture.debugElement.queryAll(
          By.css("img[alt='Image of book']")
        );
        expect(debugArr.length).toBe(1);
        //CLICK TO CALL REROUTE
        debugArr[0].nativeElement.dispatchEvent(new Event("click"));
        fixture.detectChanges();
        //IT WAS CALLED WITH THE RIGHT VALUE AND CALLED IN GENERAL
        expect(component.reroute).toHaveBeenCalledWith("url_1");
        expect(component.reroute).toHaveBeenCalled();
      });
    })
  );
});
