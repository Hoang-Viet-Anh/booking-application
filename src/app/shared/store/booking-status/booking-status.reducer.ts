import { createReducer, on } from "@ngrx/store";
import { createBookingFailure, createBookingSuccess, deleteBookingFailure, deleteBookingSuccess, updateBookingFailure, updateBookingSuccess } from "../create-booking/create-booking.actions";
import { resetBookingStatus } from "./booking-status.actions";

export interface BookingStatusState {
    isLoading: boolean;
    isSuccess: boolean;
    isFailure: boolean;
}

export const initialState: BookingStatusState = {
    isLoading: false,
    isSuccess: false,
    isFailure: false
}

export const bookingStatusReducer = createReducer(
    initialState,
    on(createBookingSuccess, (state) => ({ ...state, isLoading: false, isSuccess: true, isFailure: false })),
    on(createBookingFailure, (state) => ({ ...state, isLoading: false, isSuccess: false, isFailure: true })),
    on(updateBookingSuccess, (state) => ({ ...state, isLoading: false, isSuccess: true, isFailure: false })),
    on(updateBookingFailure, (state) => ({ ...state, isLoading: false, isSuccess: false, isFailure: true })),
    on(deleteBookingSuccess, (state) => ({ ...state, isLoading: false, isSuccess: true, isFailure: false })),
    on(deleteBookingFailure, (state) => ({ ...state, isLoading: false, isSuccess: false, isFailure: true })),
    on(resetBookingStatus, () => initialState)
)