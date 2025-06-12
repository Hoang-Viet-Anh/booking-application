import { createReducer, on } from "@ngrx/store";
import { BookingFormData } from "@shared/types/booking/BookingFormData";
import { loadBookingsFailure, loadBookingsSuccess } from "./booking.actions";

export const initialState: ReadonlyArray<BookingFormData> = [];

export const bookingReducer = createReducer(
    initialState,
    on(loadBookingsSuccess, (_state, action) => action.bookings ?? []),
    on(loadBookingsFailure, () => initialState),
)