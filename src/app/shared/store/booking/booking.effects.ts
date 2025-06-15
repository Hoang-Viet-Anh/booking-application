import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookingsService } from "@bookings/bookings.service";
import { catchError, exhaustMap, map, of, withLatestFrom } from "rxjs";
import { editBooking, loadBookings, loadBookingsFailure, loadBookingsSuccess } from "./booking.actions";
import { Store } from "@ngrx/store";
import { selectAllBookings, selectBookingsState } from "./booking.selector";
import { setBooking } from "../create-booking/create-booking.actions";

@Injectable()
export class BookingEffects {
    private bookingsService = inject(BookingsService);
    private actions$ = inject(Actions);
    private store = inject(Store);

    loadBookings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadBookings),
            exhaustMap(() => this.bookingsService.getAllBookings()
                .pipe(
                    map((bookings) => {
                        return loadBookingsSuccess({
                            bookings: bookings.map(booking => {
                                return {
                                    ...booking,
                                    dateSlot: {
                                        startDate: new Date(booking.startDate!),
                                        endDate: new Date(booking.endDate!),
                                        isStartTimeSelected: true,
                                        isEndTimeSelected: true
                                    }
                                }
                            })
                        });
                    }),
                    catchError(() => of(loadBookingsFailure()))
                )
            )
        )
    )

    editBooking$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editBooking),
            withLatestFrom(
                this.store.select(selectAllBookings)
            ),
            exhaustMap(([action, bookings]) => {
                const booking = bookings.find(b => b.id === action.id);
                if (!booking) return of();

                return of(setBooking(booking));
            })
        )
    )
}