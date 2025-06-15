import { createReducer, on } from "@ngrx/store";
import { Workspace } from "@shared/types/workspace/Workspace";
import { loadWorkspacesFailure, loadWorkspacesSuccess } from "./workspace.actions";

export const initialState: ReadonlyArray<Workspace> = [];

export const workspaceReducer = createReducer(
    initialState,
    on(loadWorkspacesSuccess, (_state, action) => action.workspaces ?? []),
    on(loadWorkspacesFailure, () => initialState),
)