import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  public get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${environment.api}${path}`, {params})
      .pipe(catchError(this.formatErrors));
  }

  public put<T>(path: string, body: object = {}): Observable<T> {
    return this.http.put<T>(
      `${environment.api}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  public post<T>(path: string, body: object = {}): Observable<T> {
    return this.http.post<T>(
      `${environment.api}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  public delete<T>(path): Observable<T> {
    return this.http.delete<T>(
      `${environment.api}${path}`
    ).pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }
}
