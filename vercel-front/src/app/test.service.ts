import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  Subject,
  first,
  shareReplay,
  tap,
} from 'rxjs';

const url =
  'https://vercel-server2-fb69g59fz-hends-projects-41abfdd8.vercel.app';
@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private httpClient: HttpClient) {}
  public data$ = new BehaviorSubject<any[]>([]);
  public currencies$ = new BehaviorSubject<any[]>([]);

  public get data(): Observable<any[]> {
    return this.data$.asObservable();
  }
  public get currencies(): Observable<any[]> {
    return this.data$.asObservable();
  }
  public getData(): Observable<any> {
    return this.httpClient
      .get<any>(
        `https://vercel-server2-fb69g59fz-hends-projects-41abfdd8.vercel.app/api/data`
      )
      .pipe(
        tap((response: any) => {
          if (response && response.data.length > 0) {
            console.log('data', response);
            this.data$.next(response.data);
          }
        })
      );
  }

  public getCurrencies(): Observable<any> {
    return this.httpClient
      .get<any>(`${url}/api/get-currency-by-date/PLN/20240403`)
      .pipe(
        tap((response: any) => {
          if (response && response.data.length > 0) {
            console.log('data', response);
            this.currencies$.next(response.data);
          }
        })
      );
  }
}
