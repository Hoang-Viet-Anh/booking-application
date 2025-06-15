import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookingFormService } from "@shared/components/booking-form/booking-form.service";
import {
    createBookingFailure, createBookingSuccess, deleteBookingFailure,
    deleteBookingRequest, deleteBookingSuccess, safeUpdateBookingDate, sendBookingRequest, updateBookingDate, updateBookingFailure, updateBookingSuccess
} from "./create-booking.actions";
import { catchError, exhaustMap, map, of, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { selectBookingWorkspace, selectCreateBooking } from "./create-booking.selector";
import { loadBookings } from "../booking/booking.actions";
import { CustomDateUtil } from "@shared/utils/CustomDateUtil";
import { selectBookedDates } from "../date-time/date-time.selector";

@Injectable({ providedIn: 'root' })
export class CreateBookingEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private bookingFormService = inject(BookingFormService);

    sendBookingRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sendBookingRequest),
            withLatestFrom(
                this.store.select(selectCreateBooking)
            ),
            exhaustMap(([_action, createBooking]) => {
                if (createBooking.id) {
                    return this.bookingFormService.updateBookingRequest(createBooking)
                        .pipe(
                            map(() => updateBookingSuccess()),
                            catchError(() => of(updateBookingFailure()))
                        )
                }

                return this.bookingFormService.createBookingRequest(createBooking)
                    .pipe(
                        map(() => createBookingSuccess()),
                        catchError(() => of(createBookingFailure()))
                    )
            })
        ));

    deleteBookingRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteBookingRequest),
            exhaustMap((action) =>
                this.bookingFormService.deleteBookingRequest(action.id)
                    .pipe(
                        map(() => {
                            this.store.dispatch(loadBookings());
                            return deleteBookingSuccess();
                        }),
                        catchError(() => of(deleteBookingFailure()))
                    )
            )
        )
    );

    setBookingDate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(safeUpdateBookingDate),
            withLatestFrom(
                this.store.select(selectBookingWorkspace),
                this.store.select(selectCreateBooking),
                this.store.select(selectBookedDates)
            ),
            exhaustMap(([action, workspace, bookingForm, bookedDates]) => {
                if (!workspace) return of();
                const merged = { ...bookingForm.dateSlot, ...action.date };

                if (workspace.maxBookingDays === 1) {
                    merged.endDate = merged.startDate;
                    merged.isEndTimeSelected = false;
                } else if (merged.startDate && merged.endDate) {
                    if (CustomDateUtil.compareDate(merged.startDate, merged.endDate) > 0) {
                        merged.endDate = undefined;
                        merged.isEndTimeSelected = false;
                    } else {
                        const msDiff = merged.endDate.getTime() - merged.startDate.getTime();
                        const maxDiff = workspace.maxBookingDays * 24 * 60 * 60 * 1000;
                        const overlappingDate = CustomDateUtil.getOverlappingDate(merged.startDate, merged.endDate, bookedDates);

                        if (msDiff > maxDiff || overlappingDate) {
                            merged.endDate = undefined;
                            merged.isEndTimeSelected = false;
                        }
                    }
                }
                return of(updateBookingDate({ date: merged }));
            })
        )
    );
}