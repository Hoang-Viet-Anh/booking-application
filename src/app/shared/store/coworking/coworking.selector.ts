import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Coworking } from "@shared/types/coworking/Coworking";

export const selectCoworkingsState = createFeatureSelector<ReadonlyArray<Coworking>>('coworkings');

export const selectAllCoworkings = createSelector(
    selectCoworkingsState,
    (state) => state
);

export const selectCoworkingById = (id: string | undefined) => createSelector(
    selectAllCoworkings,
    (coworkings) => {
        if (!id) return;
        return coworkings.find(coworking => coworking.id === id)
    }
); 