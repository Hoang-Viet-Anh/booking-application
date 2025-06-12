import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { LucideAngularModule, Menu } from 'lucide-angular';
import { DrawerComponent } from "../../../shared/components/drawer/drawer.component";
import { bookingsRoute, coworkingRoute } from '@core/app.routes';

@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonComponent, LucideAngularModule, DrawerComponent],
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly Menu = Menu;

  drawerOpen = false;

  readonly coworkingRoute = coworkingRoute;
  readonly bookingsRoute = bookingsRoute;

  openDrawer() {
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }
}
