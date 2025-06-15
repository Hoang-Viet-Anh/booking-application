import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CoworkingsService } from "app/coworkings/coworkings.service";
import { catchError, exhaustMap, map, of } from "rxjs";
import { loadCoworkings, loadCoworkingsFailure, loadCoworkingsSuccess } from "./coworking.actions";

@Injectable({ providedIn: 'root' })
export class CoworkingEffects {
    private coworkingsService = inject(CoworkingsService);
    private actions$ = inject(Actions);

    loadCoworkings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCoworkings),
            exhaustMap(() =>
                this.coworkingsService.getAllCoworkings()
                    .pipe(
                        map((coworkings) => loadCoworkingsSuccess({ coworkings })),
                        catchError(() => of(loadCoworkingsFailure()))
                    )

            )
        )
    );
}
