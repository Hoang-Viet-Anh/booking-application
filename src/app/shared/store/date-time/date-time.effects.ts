import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DateTimeService } from "@shared/components/booking-form/date-time.service";
import { loadBookedDates, loadBookedDatesFailure, loadBookedDatesSuccess, loadTimeSlots, loadTimeSlotsFailure, loadTimeSlotsSuccess } from "./date-time.actions";
import { catchError, exhaustMap, map, of, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { selectCreateBooking } from "../create-booking/create-booking.selector";
import { CustomDateUtil } from "@shared/utils/CustomDateUtil";

@Injectable({
    providedIn: 'root'
})
export class DateTimeEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private dateTimeService = inject(DateTimeService);

    loadBookedDates$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadBookedDates),
            withLatestFrom(
                this.store.select(selectCreateBooking)
            ),
            exhaustMap(([_action, createBooking]) =>
                this.dateTimeService.getBookedDates(createBooking)
                    .pipe(
                        map((bookedDatesString) => loadBookedDatesSuccess({ bookedDates: bookedDatesString.map(date => CustomDateUtil.fixUtcString(date)) })),
                        catchError(() => of(loadBookedDatesFailure()))
                    )
            )
        )
    );

    loadTimeSlots$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTimeSlots),
            withLatestFrom(
                this.store.select(selectCreateBooking)
            ),
            exhaustMap(([_action, createBooking]) =>
                this.dateTimeService.getAvailableTimeSlots(createBooking)
                    .pipe(
                        map((timeSlotsStrings) => loadTimeSlotsSuccess({
                            timeSlots: timeSlotsStrings.map(ts => {
                                return {
                                    startDate: CustomDateUtil.fixUtcString(ts.startDate),
                                    endDate: CustomDateUtil.fixUtcString(ts.endDate)
                                }
                            })
                        })),
                        catchError(() => of(loadTimeSlotsFailure()))
                    )
            )
        )
    );
}