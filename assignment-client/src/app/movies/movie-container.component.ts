import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovie } from './models/movies.model';
import { MoviesService } from './providers/movies.service';
import { IBooking } from './models/booking.model';

@Component({
  selector: 'app-movie-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesContainerComponent implements OnInit {

  data: { movies: IMovie, bookings: IBooking[] }[] = [];

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService,
    private changeDetector: ChangeDetectorRef) {



  }

  ngOnInit(): void {
    this.data = Object.assign(this.data, this.activatedRoute.snapshot.data['moviesResolver']);
    console.log(this.data)
    this.changeDetector.detectChanges();
  }

  orderHandler(value: { booking: IBooking, tickets: number, id: number }) {
    this.moviesService.booking$(value).subscribe({
      next: (response: IBooking[]) => {

        this.data[value.id].bookings = [...response];
        // debugger;
        // this.data = [...this.data];
        this.data = Object.assign(this.data,{...this.data});
        console.log(this.data);
        this.changeDetector.detectChanges();
      },
      error: (err) => console.log(err)
    });
  }
}
