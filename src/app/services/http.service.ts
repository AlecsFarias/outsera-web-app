import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface QueryParams {
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | number[]
    | boolean[]
    | null
    | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl: string = environment.apiUrl;
  private defaultTimeout: number = environment.apiTimeout;

  constructor(private http: HttpClient) {}

  /**
   * GET request
   */
  get<T>(url: string, params?: QueryParams): Observable<T> {
    const fullUrl = this.buildFullUrl(url);
    const httpParams = this.buildHttpParams(params);
    const options = {
      headers: this.getHeaders(),
      params: httpParams,
    };

    return this.http
      .get<T>(fullUrl, options)
      .pipe(timeout(this.defaultTimeout), catchError(this.handleError));
  }

  /**
   * Build HTTP headers
   */
  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    // Add authorization header if token exists
    const token = this.getAuthToken();
    if (token) {
      return headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /**
   * Build HTTP parameters
   */
  private buildHttpParams(params?: QueryParams): HttpParams {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((val) => {
              httpParams = httpParams.append(key, String(val));
            });
          } else {
            httpParams = httpParams.set(key, String(value));
          }
        }
      });
    }

    return httpParams;
  }

  /**
   * Build full URL
   */
  private buildFullUrl(url: string): string {
    // If URL already starts with http/https, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    // If URL already contains the base URL, return as is
    if (url.includes(this.baseUrl)) {
      return url;
    }

    return `${this.baseUrl}${url}`;
  }

  /**
   * Get authentication token
   */
  private getAuthToken(): string | null {
    // Implement your token storage logic here
    // Example: return localStorage.getItem('authToken');
    return null;
  }

  /**
   * Handle HTTP errors
   */
  private handleError = (error: any): Observable<never> => {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }

    if (environment.enableLogging) {
      console.error('HTTP Error:', error);
    }

    return throwError(() => new Error(errorMessage));
  };
}
