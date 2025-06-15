import { createAction, props } from "@ngrx/store";

export const setPrompt = createAction('[AI Assistant] Set Prompt', props<{ prompt: string }>());
export const setResponse = createAction('[AI Assistant] Set Response', props<{ response: string }>());
export const clearChat = createAction('[AI Assistant] Clear Chat');

export const sendPrompt = createAction('[AI Assistant] Send Prompt', props<{ prompt: string }>());