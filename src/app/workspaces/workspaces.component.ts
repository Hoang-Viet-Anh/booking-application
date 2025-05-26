import { Component } from '@angular/core';
import { WorkspaceCardComponent } from './components/workspace-card/workspace-card.component';

@Component({
  selector: 'app-workspaces',
  imports: [WorkspaceCardComponent],
  templateUrl: './workspaces.component.html',
})
export class WorkspacesComponent {

}
