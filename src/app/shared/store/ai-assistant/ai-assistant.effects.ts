import { inject, Injectable } from "@angular/core";
import { AiAssistantService } from "@bookings/components/ai-assistant/ai-assistant.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { clearChat, sendPrompt, setPrompt, setResponse } from "./ai-assistant.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Store } from "@ngrx/store";

@Injectable()
export class AiAssistantEffects {
    private actions$ = inject(Actions);
    private aiAssistantService = inject(AiAssistantService);
    private store = inject(Store);

    sendPrompt$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sendPrompt),
            exhaustMap((action) => this.aiAssistantService.getResponseRequest(action.prompt)
                .pipe(
                    map(rs => {
                        this.store.dispatch(setPrompt({ prompt: action.prompt }));
                        return setResponse({ response: rs.response });
                    }),
                    catchError(() => of(clearChat()))
                ))));
}