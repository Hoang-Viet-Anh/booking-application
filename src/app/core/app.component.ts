import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Store } from '@ngrx/store';
import { loadCoworkings } from '@shared/store/coworking/coworking.actions';
import { loadWorkspaces } from '@shared/store/workspace/workspace.actions';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'booking-application';

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadCoworkings());
    this.store.dispatch(loadWorkspaces());
  }
}
