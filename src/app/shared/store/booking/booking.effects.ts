import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookingsService } from "@bookings/bookings.service";
import { catchError, exhaustMap, map, of } from "rxjs";
import { loadBookings, loadBookingsFailure, loadBookingsSuccess } from "./booking.actions";

@Injectable()
export class BookingEffects {
    private bookingsService = inject(BookingsService);
    private actions$ = inject(Actions);

    loadBookings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadBookings),
            exhaustMap(() => this.bookingsService.getAllBookings()
                .pipe(
                    map((bookings) => loadBookingsSuccess({ bookings })),
                    catchError(() => of(loadBookingsFailure()))
                )
            )
        )
    )
}