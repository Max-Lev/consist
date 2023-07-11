import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { MoviesModule } from '../movies.module';
import { Observable, concat, concatMap, exhaustMap, flatMap, forkJoin, from, map, merge, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { IMovie } from '../models/movies.model';
import { IBooking } from '../models/booking.model';

@Injectable()
export class MoviesService {

  constructor(private http: HttpClient) {

  };

  getMovies$(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`/api/movies`);
  }

  getBooking$(movieId: number): Observable<IBooking[]> {
    return this.http.get<IBooking[]>(`/api/movies/booking/${movieId}`);
  }

  getData$(): Observable<{ movies: IMovie, bookings: IBooking[] }[]> {

    return this.getMovies$().pipe(

      mergeMap((movies: IMovie[]) => {
        return forkJoin(movies.map((movie: IMovie) => {

          return this.getBooking$(movie.id).pipe(map((booking: IBooking[]) => ({
            movies: movie,
            bookings: booking
          })))

        }))
      })

    );

  }


}
