import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-icon',
  imports: [],
  templateUrl: './icon.component.html',
})
export class IconComponent {
  @Input() iconPath: string = "/icons/user.svg";
  @Input() alt: string = "user icon";
}
