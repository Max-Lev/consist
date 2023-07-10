import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { MoviesModule } from '../movies.module';
import { Observable } from 'rxjs';
import { IMovie } from '../models/movies.model';

@Injectable({providedIn: 'root'})
export class MoviesService {

  constructor(private http: HttpClient) {

  };

  getMovies$(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${environment.api}/api/movies`);
  }


}
