import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookingFormData } from "@shared/types/booking/BookingFormData";
import { selectAllWorkspaces } from "../workspace/workspace.selector";
import { selectAllCoworkings } from "../coworking/coworking.selector";

export const selectCreateBookingState = createFeatureSelector<BookingFormData>('createBooking');

export const selectCreateBooking = createSelector(
    selectCreateBookingState,
    (state) => state
);

export const selectDateSlot = createSelector(
    selectCreateBooking,
    (currentBooking) => currentBooking.dateSlot
);

export const selectBookingCoworking = createSelector(
    selectCreateBooking,
    selectAllCoworkings,
    (currentBooking, coworkings) => {
        const { coworkingId } = currentBooking;
        if (!coworkingId) return;

        const coworking = coworkings.find(c => c.id === coworkingId);
        if (!coworking) return;

        return coworking;
    }
);

export const selectBookingWorkspace = createSelector(
    selectCreateBooking,
    selectAllWorkspaces,
    (currentBooking, workspaces) => {
        const { workspaceId } = currentBooking;
        if (!workspaceId) return;

        const workspace = workspaces.find(w => w.id === workspaceId);
        if (!workspace) return;

        return workspace;
    }
);

export const selectMaxBookingDate = createSelector(
    selectCreateBooking,
    selectBookingWorkspace,
    (currentBooking, workspace) => {
        const { workspaceId, dateSlot } = currentBooking;
        if (!workspaceId || !dateSlot || !dateSlot.startDate || !workspace || !workspace.maxBookingDays) return;

        const max = new Date(dateSlot.startDate);
        const daysToAdd = (workspace.maxBookingDays ?? 1) - 1;
        max.setDate(max.getDate() + daysToAdd);

        return max;
    }
);

export const selectCoworkingWorkspaces = createSelector(
    selectBookingCoworking,
    selectAllWorkspaces,
    (coworking, workspaces) => {
        if (!coworking || !workspaces) return [];

        return workspaces.filter(w => coworking.workspacesCapacity.find(c => c.workspaceId === w.id));
    }
);

export const selectCoworkingAreaCapacities = createSelector(
    selectCreateBooking,
    selectBookingCoworking,
    (currentBooking, coworking) => {
        const { workspaceId } = currentBooking;
        if (!coworking || !workspaceId) return;

        return coworking.workspacesCapacity.find(w => w.workspaceId === workspaceId)?.availability.map(a => a.capacity);
    }
);

export const selectIsValidForm = createSelector(
    selectCreateBooking,
    (state) => {
        const { name, email, coworkingId, workspaceId, dateSlot, areaCapacity } = state;

        const hasRequiredFields = !!name && !!email && !!coworkingId && !!workspaceId;

        const hasValidDates = !!dateSlot?.startDate && !!dateSlot?.endDate
            && dateSlot.isStartTimeSelected && dateSlot.isEndTimeSelected;

        const hasValidareaCapacity = areaCapacity && areaCapacity.length > 0;

        return hasRequiredFields && hasValidDates && hasValidareaCapacity;
    }
);