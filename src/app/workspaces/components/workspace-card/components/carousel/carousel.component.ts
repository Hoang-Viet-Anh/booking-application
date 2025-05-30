import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, ArrowLeft, ArrowRight } from 'lucide-angular';

@Component({
  standalone: true,
  selector: 'workspace-carousel',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './carousel.component.html',
})
export class CarouselComponent {
  readonly ArrowLeft = ArrowLeft;
  readonly ArrowRight = ArrowRight;

  @Input() images: string[] = [];

  currentIndex = 0;

  prev() {
    this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
  }

  next() {
    this.currentIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
  }
}
