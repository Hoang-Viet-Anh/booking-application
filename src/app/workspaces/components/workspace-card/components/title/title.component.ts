import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'workspace-card-title',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './title.component.html',
})
export class WorkspaceTitleComponent {
  constructor(private router: Router) { }
  @Input() title: string = "Title";
  @Input() description: string =
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
  Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, 
  dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper`;

  onBookNow() {
    this.router.navigate(['/workspaces/create-booking']);
  }
}
