import { createReducer, on } from "@ngrx/store";
import { loadBookedDatesFailure, loadBookedDatesSuccess, loadTimeSlotsFailure, loadTimeSlotsSuccess } from "./date-time.actions";
import { TimeSlot } from "@shared/types/booking/TimePeriod";

export interface DateTimeState {
    bookedDates: Date[];
    timeSlots: TimeSlot[];
}

export const initialState: DateTimeState = {
    bookedDates: [],
    timeSlots: []
}

export const dateTimeReducer = createReducer(
    initialState,
    on(loadBookedDatesSuccess, (state, action) => ({ ...state, bookedDates: action.bookedDates })),
    on(loadBookedDatesFailure, (state, _action) => ({ ...state, bookedDates: [] })),
    on(loadTimeSlotsSuccess, (state, action) => ({ ...state, timeSlots: action.timeSlots })),
    on(loadTimeSlotsFailure, (state, _action) => ({ ...state, timeSlots: [] })),
)