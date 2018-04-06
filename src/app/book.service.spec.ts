import { TestBed, async, inject } from "@angular/core/testing";
import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http,
} from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";

import { BookService } from "./book.service";
import { MockBooks } from "./book.service.mock";

const book = {
  url_title: "some_book_9000",
  amazon_editorial_review:
    "<b>The third volume of one of the greatest novels of the twentieth century</b><br><br>Mark Treharne's acclaimed new translation of <i>The Guermantes Way </i>will introduce a new generation of American readers to the literary richness of Marcel Proust. The third volume in Penguin Classics' superb new edition of <i>In Search of Lost Time—</i>the first completely new translation of Proust's masterpiece since the 1920s—brings us a more comic and lucid prose than English readers have previously been able to enjoy.<br><br>After the relative intimacy of the first two volumes of <i>In Search of Lost Time</i>, <i>The Guermantes Way</i> opens up a vast, dazzling landscape of fashionable Parisian life in the late nineteenth century, as the narrator enters the brilliant, shallow world of the literary and aristocratic salons. Both a salute to and a devastating satire of a time, place, and culture, <i>The Guermantes Way</i> defines the great tradition of novels that follow the initiation of a young man into the ways of the world.",
  amazon_reviews: [{ thing: 0, IFrameURL: "https://www.google.com" }],
  amazon_similar_products: [
    {
      ASIN: ["http://www.goodreads.com/book/isbn/0143039075"],
      Title: [
        "In the Shadow of Young Girls in Flower: In Search of Lost Time, Vol. 2 (Penguin Classics Deluxe Edition)",
      ],
    },
    {
      ASIN: ["http://www.goodreads.com/book/isbn/0143039075"],
      Title: [
        "In the Shadow of Young Girls in Flower: In Search of Lost Time, Vol. 2 (Penguin Classics Deluxe Edition)",
      ],
    },
    {
      ASIN: ["http://www.goodreads.com/book/isbn/0143039075"],
      Title: [
        "In the Shadow of Young Girls in Flower: In Search of Lost Time, Vol. 2 (Penguin Classics Deluxe Edition)",
      ],
    },
    {
      ASIN: ["http://www.goodreads.com/book/isbn/0143039075"],
      Title: [
        "In the Shadow of Young Girls in Flower: In Search of Lost Time, Vol. 2 (Penguin Classics Deluxe Edition)",
      ],
    },
  ],
  author: "some guy",
  author_name: "Some Guy",
  exact_title: "Some Amazing Title",
  front_cover: "https://images.isbndb.com/covers/92/28/9780143039228.jpg",
  goodreads_author_image:
    "https://images.gr-assets.com/authors/1392271688p5/233619.jpg",
  goodreads_author_link:
    "https://www.goodreads.com/author/show/233619.Marcel_Proust",
  goodreads_description:
    "After the relative intimacy of the first two volumes of <b>In Search of Lost Time</b>, <b>The Guermantes Way</b> opens up a vast, dazzling landscape of fashionable Parisian life in the late nineteenth century, as the narrator enters the brilliant, shallow world of the literary and aristocratic salons. Both a salute to and a devastating satire of a time, place, and culture, <b>The Guermantes Way</b> defines the great tradition of novels that follow the initiation of a young man into the ways of the world. This elegantly packaged new translation will introduce a new generation of American readers to the literary richness of Marcel Proust.<br />First time in Penguin Classics<br /><br /><br />A Penguin Classics Deluxe Edition with french flaps and luxurious design<br /><br /><br />Penguin Classics' superb new edition of <b>In Search of Lost Time</b> is the first completely new translation of Proust's masterwork since the 1920s",
  goodreads_reviews_widget:
    "https://www.goodreads.com/api/reviews_widget_iframe?did=DEVELOPER_ID&amp;format=html&amp;isbn=0143039229&amp;links=660&amp;min_rating=&amp;review_back=fff&amp;stars=000&amp;text=000",
  goodreads_similar_books: [{}, {}, {}],
  penguin_data: [{}, {}, {}],
  wikipedia_text:
    "Valentin Louis Georges Eugène Marcel Proust (; ; 10 July 1871 – 18 November 1922), known as Marcel Proust, was a French novelist, critic, and essayist best known for his monumental novel À la recherche du temps perdu (In Search of Lost Time; earlier rendered as Remembrance of Things Past), published in seven parts between 1913 and 1927. He is considered by critics and writers to be one of the most influential authors of the 20th↵↵ century.",
  isbn: "0143039229",
  date: "today",
  updated: "tomorrow",
};

describe("Service: Books", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (
            backend: MockBackend,
            defaultOptions: BaseRequestOptions
          ) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions],
        },
      ],
    });
  });

  it(
    "should create a service",
    inject([BookService], (service: BookService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    "should return all of the books",
    inject(
      [BookService, MockBackend],
      (service: BookService, backend: MockBackend) => {
        let response = new ResponseOptions({
          body: JSON.stringify(MockBooks),
        });

        const baseResponse = new Response(response);

        backend.connections.subscribe((c: MockConnection) =>
          c.mockRespond(baseResponse)
        );

        return service.getBooks().subscribe(data => {
          expect(data).toEqual(MockBooks);
        });
      }
    )
  );

  it(
    "should return a particular book when getBook() is called",
    inject(
      [BookService, MockBackend],
      (service: BookService, backend: MockBackend) => {
        let response = new ResponseOptions({
          body: JSON.stringify(MockBooks),
        });

        const baseResponse = new Response(response);

        backend.connections.subscribe((c: MockConnection) =>
          c.mockRespond(baseResponse)
        );

        //MOCK DOES NOT ALLOW ME TO GET A SPECIFIC ONE AS THE LOGIC EXISTS IN THE BACKEND, SO GRAB FIRST ONE
        return service.getBook("").subscribe(data => {
          //THE GET BOOK FUNCTION GOES THROUGH FUNCTIONS ALTERING THE DATA, LETS FOCUS ON SOMETHING UNIQUE THAT DOESN'T CHANGE
          expect(data["url_title"]).toEqual(MockBooks[0]["url_title"]);
        });
      }
    )
  );
});
