import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ChatEntry } from "@shared/types/ai-assistant/ChatEntry";

export const selectAiAssistantState = createFeatureSelector<ChatEntry>('aiAssistant');

export const selectChat = createSelector(
    selectAiAssistantState,
    (state) => state
);

export const selectPrompt = createSelector(
    selectChat,
    (chat) => chat.prompt
);

export const selectResponse = createSelector(
    selectChat,
    (chat) => chat.response
);