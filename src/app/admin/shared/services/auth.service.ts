import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FirebaseAuthResponce, User} from '../interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, delay, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable()
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  get token(): string {
    const expDate = new Date(localStorage.getItem('fd-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<FirebaseAuthResponce> {
    user.returnSecureToken = true;
    return this.http
      .post<FirebaseAuthResponce>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this)),
        delay(500)
      );
  }

  logout(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;

  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    const {message} = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email не найден');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
    }

    return throwError(error);
  }

  private setToken(response: FirebaseAuthResponce | null): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fd-token-exp', expDate.toString());

    } else {
      localStorage.clear();
    }
  }

}
