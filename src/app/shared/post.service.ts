import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FbCreateResponse, Post} from '../admin/shared/interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDdUrl}/posts.json`, post)
      .pipe(
        map((response: FbCreateResponse) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          };
        })
      );
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.fbDdUrl}/posts.json`)
      .pipe(
        map((resnose: { [key: string]: any }) => {
          return Object
            .keys(resnose)
            .map(key => ({
              ...resnose[key],
              id: key,
              date: new Date(resnose[key].date)
            }));
        })
      );
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDdUrl}/posts/${id}.json`)
      .pipe(
        map((post: Post) => {
          return {
            ...post,
            id,
            date: new Date(post.date)
          };
        })
      );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDdUrl}/posts/${id}.json`);
  }

  edit(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDdUrl}/posts/${post.id}.json`, post);
  }

}
