import { createAction, props } from "@ngrx/store";
import { Coworking } from "@shared/types/coworking/Coworking";

export const loadCoworkings = createAction('[Coworkings] Load');
export const loadCoworkingsSuccess = createAction('[Coworkings] Load success', props<{ coworkings: ReadonlyArray<Coworking> }>());
export const loadCoworkingsFailure = createAction('[Coworkings] Load failure');