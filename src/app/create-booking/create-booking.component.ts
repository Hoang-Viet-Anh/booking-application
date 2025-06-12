import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { coworkingRoute } from '@core/app.routes';
import { BookingFormComponent } from '@shared/components/booking-form/booking-form.component';
import { BookingFormService } from '@shared/components/booking-form/booking-form.service';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-create-booking',
  imports: [BookingFormComponent],
  templateUrl: './create-booking.component.html',
})
export class CreateBookingComponent implements OnInit {
  constructor(
    private router: Router,
    private bookingFormService: BookingFormService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.bookingFormService.setBookingForm({});
  }

  onClickBack() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate([coworkingRoute]);
      return;
    }
    this.router.navigate([`${coworkingRoute}/${id}/workspaces`])
  }
}
