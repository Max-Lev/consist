import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from './providers/movies.service';
import { DataModel, IBooking, IData } from './models/booking.model';

@Component({
  selector: 'app-movie-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesContainerComponent implements OnInit {

  datalist: DataModel[];

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService,
    private changeDetector: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.datalist = this.activatedRoute.snapshot.data['moviesResolver'].map((_data: IData) => new DataModel(_data));
    this.changeDetector.detectChanges();
  }

  orderHandler(value: { booking: IBooking, tickets: number, id: number }) {
    this.moviesService.booking$(value).subscribe({
      next: (response: IBooking[]) => {
        this.datalist[value.id] = new DataModel({ bookings: response, movie: this.datalist[value.id].movie });
        this.changeDetector.detectChanges();
      },
      error: (err) => console.log(err)
    });
  }
}
