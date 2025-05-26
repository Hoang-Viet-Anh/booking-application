import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'workspace-amenities',
  imports: [CommonModule, IconComponent],
  templateUrl: './amenities.component.html',
})
export class AmenitiesComponent {
  @Input() amenities?: string[];

  private availableAmenities = [
    { name: "wifi", iconPath: "/icons/wifi.svg" },
    { name: "coffee", iconPath: "/icons/coffee.svg" },
    { name: "a/c", iconPath: "/icons/air-conditioning.svg" },
    { name: "gaming", iconPath: "/icons/device-gamepad-2.svg" },
    { name: "headphones", iconPath: "/icons/headphones.svg" },
    { name: "microphone", iconPath: "/icons/microphone.svg" },
  ];

  getAmenityIcon(name: string): string | null {
    const found = this.availableAmenities.find(
      (a) => a.name.toLowerCase() === name.toLowerCase()
    );
    return found ? found.iconPath : null;
  }
}