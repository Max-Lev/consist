import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IMovie } from '../../models/movies.model';
import { IBooking } from '../../models/booking.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnChanges {

  @Input() movie: {movies: IMovie, bookings: IBooking[]};

   hallSelected:any;

  @Input() hall:any;

  constructor(){

  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.movie)
  }

}
