import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap, forkJoin, map, pipe, catchError, throwError } from 'rxjs';
import { IBooking, IData } from '../models/booking.model';
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

  getData$(): Observable<IData[]> {

    return this.getMovies$()
      .pipe(
        mergeMap((movies: IMovie[]) => {
          return forkJoin(movies.map((movie: IMovie) => {

            return this.getBooking$(movie.id).pipe(map((booking: IBooking[]) => ({
              movie: movie,
              bookings: booking
            }) as IData))

          }))
        }),
        pipe(catchError(err => {
          return throwError(() => {
            console.log(err);
            return new Error(err);
          })
        })),
        pipe(
          map((data: IData[]) => {
            data.map((info: IData) => {
              this.setTime(info);
            })
            return data;
          })
        )
      );

  }

  setTime(data: IData): IData {
    const _data = data;
    _data.bookings.filter((_booking: IBooking) => {
      _booking.showTime = new Date(_booking.showTime).toLocaleString()
    });
    return _data;
  }

  booking$(value: { booking: IBooking, tickets: number }): Observable<any> {
    const payload = { showId: value.booking.id, tickets: value.tickets };

    return this.http.put(`/api/booking`, payload, { responseType: 'text' })
      .pipe(mergeMap(() => this.getBooking$(value.booking.movieId).pipe(
        map((booking: IBooking[]) => {
          return booking.filter((_booking:IBooking)=>{
            _booking.showTime = new Date(_booking.showTime).toLocaleString();
            return _booking.showTime;
          })
        })
      )))
      .pipe(catchError(err => {
        return throwError(() => {
          console.log(err);
          return new Error(err);
        })
      }));
  }


}
