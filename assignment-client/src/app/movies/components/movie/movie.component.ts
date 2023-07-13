import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IMovie } from '../../models/movies.model';
import { DataModel, IBooking, IData } from '../../models/booking.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CapacityValidatorService } from '../../providers/capacity.validator.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnChanges, AfterViewInit {

  @Input() dataItem: DataModel;

  hallSelected: any;

  @Input() hall: any;

  bookingForm: FormGroup;

  @Output() orderEmitter: EventEmitter<{ booking: IBooking, tickets: number, id: number }> = new EventEmitter();

  @Input() id: number = -1;

  selected: IBooking | null;

  constructor(private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private capacityValidatorService: CapacityValidatorService) {

    this.bookingForm = this.formBuilder.group({
      booking: new FormControl<IBooking | null>(this.selected, [Validators.required]),
      tickets: new FormControl<number>(1, [Validators.min(1)])
    }, { validators: this.capacityValidatorService.capacity });

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selected = (this.bookingForm.get('booking')?.value !== null)
      ? this.bookingForm.get('booking')?.value : this.dataItem?.bookings[0];
    this.bookingForm.get('booking')?.patchValue(this.selected);
    this.bookingForm.updateValueAndValidity();
    
  }

  ngAfterViewInit(): void {
    
  }

  submit(value: { booking: IBooking, tickets: number }) {
    this.orderEmitter.emit({ booking: value.booking, tickets: value.tickets, id: this.id });
  }


}
