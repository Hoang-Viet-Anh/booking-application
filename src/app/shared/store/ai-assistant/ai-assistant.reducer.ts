import { createReducer, on } from "@ngrx/store";
import { ChatEntry } from "@shared/types/ai-assistant/ChatEntry";
import { clearChat, setPrompt, setResponse } from "./ai-assistant.actions";

export const initialState: ChatEntry = {}

export const aiAssistantReducer = createReducer(
    initialState,
    on(setPrompt, (state, action) => ({ ...state, prompt: action.prompt })),
    on(setResponse, (state, action) => ({ ...state, response: action.response })),
    on(clearChat, () => initialState),
)