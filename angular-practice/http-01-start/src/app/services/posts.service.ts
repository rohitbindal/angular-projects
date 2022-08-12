import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Subject, tap, throwError } from "rxjs";
import { Post } from "../models/post.model";

const DATABASE_URL = "https://http-demo-9f06d-default-rtdb.firebaseio.com/";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  error = new Subject<string>();
  constructor(private _http: HttpClient) {}
  createAndStorePost(title: string, content: string) {
    const postData = { title, content };
    this._http
      .post(DATABASE_URL + "posts.json", postData, {
        // Get the full response object.
        observe: "response",
      })
      .subscribe({
        next: (responseData) => {
          console.log(responseData);
        },
        error: (error) => {
          this.error.next(error.message);
        },
      });
  }
  // Method to fetch data from the server.
  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("print", "pretty");
    searchParams = searchParams.append("custom", "key");
    return (
      this._http
        // .get<{ [key: string]: Post }>(DATABASE_URL + "posts.json") --> 'get' method has a generic type
        .get(DATABASE_URL + "posts.json", {
          // Adding custom headers to the request.
          headers: new HttpHeaders({
            "custom-header": "hello",
          }),
          // Adding parameters to the request.
          // params: new HttpParams().set("print", "pretty"),
          params: searchParams,
        })
        .pipe(
          map((responseData) => {
            // Convert the received Object to an Array
            const responseArray: [string, Post][][] =
              Object.entries(responseData);
            console.log(responseArray);
            // Transform the data to a more manageable format.
            const transformedData: Post[] = this.transformData(responseArray);
            return transformedData;
          }),
          catchError((errorResponse) => {
            // Some error handling Task...
            return throwError(() => new Error(errorResponse));
          })
        )
    );
  }
  deleteAllPosts() {
    return this._http
      .delete(DATABASE_URL + "posts.json", {
        // Event type can be used to get a granular control on how the UI is updated based on the events
        observe: "events",
      })
      .pipe(
        // tap() operator can be used to access the data without modifying it.
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
  // Method to fetch data from the server using a generic type
  //   fetchPosts() {
  //     return this._http
  //       .get<{ [key: string]: Post }>(DATABASE_URL + "posts.json")
  //       .pipe(
  //         map((responseData) => {
  //           const responseArray: Post[] = [];
  //           for (const key in responseData) {
  //             if (responseData.hasOwnProperty(key)) {
  //               responseArray.push({
  //                 ...responseData[key],
  //                 id: key,
  //               });
  //             }
  //           }
  //           return responseArray;
  //         })
  //       )
  //   }

  // Method to transform the data received from server.
  transformData(responseArray: [string, Post][][]): Post[] {
    return responseArray.map((data) => {
      let postId = String(data[0]);
      let contentObject = data[1];
      let contentArray = [];
      // Get the value of 'title' and 'content' properties.
      for (const key in contentObject) {
        contentArray.push(String(contentObject[key]));
      }
      // return a 'Post' object.
      return {
        id: postId,
        title: contentArray[0],
        content: contentArray[1],
      };
    });
  }
}
