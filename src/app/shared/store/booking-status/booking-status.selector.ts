import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookingStatusState } from "./booking-status.reducer";

export const selectBookingStatusState = createFeatureSelector<BookingStatusState>('bookingStatus');

export const selectBookingStatus = createSelector(
    selectBookingStatusState,
    (state) => state
)