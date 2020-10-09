import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FirebaseAuthResponce, User} from './interfaces';
import {Observable} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthService {

  get token(): string {
    return '';
  }

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<FirebaseAuthResponce> {
    return this.http
      .post<FirebaseAuthResponce>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        delay(500)
      );
  }

  logout(): void {

  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: FirebaseAuthResponce): void {
    console.log(response);
  }

}
