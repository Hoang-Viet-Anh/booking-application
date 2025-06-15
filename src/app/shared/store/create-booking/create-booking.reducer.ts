import { createReducer, on } from "@ngrx/store";
import { BookingFormData } from "@shared/types/booking/BookingFormData";
import {
    resetBooking, setBooking, updateBookingDate, updateBookingTime,
    updateBooking, updateWorkspaceId, resetBookingDate,
    addAreaCapacity, removeAreaCapacity
} from "./create-booking.actions";

export const initialState: BookingFormData = {};

export const createBookingReducer = createReducer(
    initialState,
    on(setBooking, (_state, action) => action),
    on(updateBooking, (_state, action) => ({ ..._state, ...action })),
    on(updateWorkspaceId, (_state, action) => ({ ..._state, workspaceId: action.workspaceId, dateSlot: {}, areaCapacity: [] })),
    on(addAreaCapacity, (state, action) => ({ ...state, areaCapacity: [...(state.areaCapacity ?? []), action.areaCapacity], dateSlot: {} })),
    on(removeAreaCapacity, (state, action) => ({ ...state, areaCapacity: state.areaCapacity?.filter(s => s !== action.areaCapacity), dateSlot: {} })),
    on(updateBookingDate, (_state, action) => ({ ..._state, dateSlot: { ..._state.dateSlot, ...action.date } })),
    on(updateBookingTime, (_state, action) => ({ ..._state, dateSlot: { ..._state.dateSlot, ...action.time } })),
    on(resetBookingDate, (_state) => ({ ..._state, dateSlot: {} })),
    on(resetBooking, () => initialState),
)