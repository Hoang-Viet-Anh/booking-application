import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookingFormData } from "@shared/types/booking/BookingFormData";

export const selectBookingsState = createFeatureSelector<ReadonlyArray<BookingFormData>>('bookings');

export const selectAllBookings = createSelector(
    selectBookingsState,
    (state) => state
);

export const selectBookingById = (id: string) => createSelector(
    selectAllBookings,
    (bookings) => bookings.find(booking => booking.id === id)
);