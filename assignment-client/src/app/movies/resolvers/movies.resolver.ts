import { ResolveFn } from '@angular/router';
import { MoviesService } from '../providers/movies.service';
import { inject } from '@angular/core';
import { IMovie } from '../models/movies.model';
import { Observable } from 'rxjs/internal/Observable';
import { IBooking, IData } from '../models/booking.model';

export const moviesResolver: ResolveFn<Observable<IData[]>> = (route, state) => {
    return inject(MoviesService).getData$();
  };
