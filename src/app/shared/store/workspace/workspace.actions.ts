import { createAction, props } from "@ngrx/store";
import { Workspace } from "@shared/types/workspace/Workspace";

export const loadWorkspaces = createAction('[Workspaces] Load');
export const loadWorkspacesSuccess = createAction('[Workspaces] Load success', props<{ workspaces: ReadonlyArray<Workspace> }>());
export const loadWorkspacesFailure = createAction('[Workspaces] Load failure');
