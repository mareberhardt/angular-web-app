import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  first: string = '';
  prev: string = '';
  next: string = '';
  last: string = '';

  private SERVER_URL = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(){
    // Add safe, URL encoded _page and _limit parameters
    return this.httpClient.get(this.SERVER_URL, {
      params: new HttpParams({fromString: '_page=1&_limit=20'}),
      observe: 'response'
    }).pipe(
      retry(3),
      catchError(this.handleError),
      tap(res => {
        console.log(res.headers.get('Link'));
        this.parseLinkHeader(res.headers.get('Link'));
      })
    );
  }

  parseLinkHeader(header) {
    if (header.length === 0) {
      return ;
    }

    const parts = header.split(',');
    const links = {};
    parts.forEach( p => {
      const section = p.split(';');
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });

    // tslint:disable: no-string-literal
    this.first  = links['first'];
    this.last   = links['last'];
    this.prev   = links['prev'];
    this.next   = links['next'];
  }

  public sendGetRequestToUrl(url: string) {
    return this.httpClient.get(url, { observe: 'response'})
      .pipe(retry(3),
        catchError(this.handleError),
        tap(res => { 
          console.log(res.headers.get('Link'));
          this.parseLinkHeader(res.headers.get('Link'));
        })
      );
  }
}
