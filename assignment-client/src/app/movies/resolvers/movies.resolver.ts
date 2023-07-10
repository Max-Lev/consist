import { ResolveFn } from '@angular/router';
import { MoviesService } from '../providers/movies.service';
import { inject } from '@angular/core';
import { IMovie } from '../models/movies.model';

export const moviesResolver: ResolveFn<IMovie[]> = (route, state) => {
  return inject(MoviesService).getMovies$();
};
