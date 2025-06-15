import { createReducer, on } from "@ngrx/store";
import { Coworking } from "@shared/types/coworking/Coworking";
import { loadCoworkingsFailure, loadCoworkingsSuccess } from "./coworking.actions";

export const initialState: ReadonlyArray<Coworking> = [];

export const coworkingReducer = createReducer(
    initialState,
    on(loadCoworkingsSuccess, (_state, action) => action.coworkings ?? []),
    on(loadCoworkingsFailure, () => initialState),
) 