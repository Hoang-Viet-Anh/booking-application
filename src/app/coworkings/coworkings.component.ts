import { Component } from '@angular/core';
import { CoworkingCardComponent } from './components/coworking-card/coworking-card.component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Coworking } from '@shared/types/coworking/Coworking';
import { selectAllCoworkings } from '@shared/store/coworking/coworking.selector';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../shared/components/button/button.component";
import { loadCoworkings } from '@shared/store/coworking/coworking.actions';

@Component({
  selector: 'app-coworkings',
  imports: [CoworkingCardComponent, CommonModule, ButtonComponent],
  templateUrl: './coworkings.component.html',
  styleUrl: './coworkings.component.css'
})
export class CoworkingsComponent {
  coworkings$: Observable<readonly Coworking[]> = of([]);

  constructor(
    private store: Store,
  ) {
    this.coworkings$ = this.store.select(selectAllCoworkings);
  }

  onRefreshList() {
    this.store.dispatch(loadCoworkings());
  }
}
