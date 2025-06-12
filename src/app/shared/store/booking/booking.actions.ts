import { createAction, props } from "@ngrx/store";
import { BookingFormData } from "@shared/types/booking/BookingFormData";

export const loadBookings = createAction('[Bookings] Load');
export const loadBookingsSuccess = createAction('[Bookings] Load success', props<{ bookings: ReadonlyArray<BookingFormData> }>());
export const loadBookingsFailure = createAction('[Bookings] Load failure');