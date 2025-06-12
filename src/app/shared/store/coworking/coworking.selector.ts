import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Coworking } from "@shared/types/coworking/Coworking";

export const selectCoworkingsState = createFeatureSelector<ReadonlyArray<Coworking>>('coworkings');

export const selectAllCoworkings = createSelector(
    selectCoworkingsState,
    (state) => state
);

export const selectCoworkingById = (id: string) => createSelector(
    selectAllCoworkings,
    (coworkings) => coworkings.find(coworking => coworking.id === id)
);