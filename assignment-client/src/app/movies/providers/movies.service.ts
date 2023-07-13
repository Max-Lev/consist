import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap, forkJoin, map, pipe, catchError, throwError } from 'rxjs';
import { IBooking } from '../models/booking.model';
import { IMovie } from '../models/movies.model';

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

    return this.getMovies$()
      .pipe(
        mergeMap((movies: IMovie[]) => {
          return forkJoin(movies.map((movie: IMovie) => {

            return this.getBooking$(movie.id).pipe(map((booking: IBooking[]) => ({
              movies: movie,
              bookings: booking
            })))

          }))
        }),
        pipe(catchError(err => {
          return throwError(() => {
            console.log(err);
            return new Error(err);
          })
        })),
        pipe(
          map((data: { movies: IMovie, bookings: IBooking[] }[]) => {
            data.map((info) => {
              info.bookings.map(b => {
                b.showTime = new Date(b.showTime).toLocaleString()
              })
            })
            return data;
          })
        )
      );

  }

  booking$(value: { booking: IBooking, tickets: number }): Observable<any> {
    const payload = { showId: value.booking.id, tickets: value.tickets };

    return this.http.put(`/api/booking`, payload, { responseType: 'text' })
      .pipe(mergeMap(() => this.getBooking$(value.booking.movieId)))
      .pipe(catchError(err => {
        return throwError(() => {
          console.log(err);
          return new Error(err);
        })
      }));
  }


}
