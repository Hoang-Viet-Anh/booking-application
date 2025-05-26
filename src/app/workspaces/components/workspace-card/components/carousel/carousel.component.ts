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

  @Input() images: string[] = [
    "https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8MTYlM0E5fGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8MTYlM0E5fGVufDB8fDB8fHww",
    "https://cdn.pixabay.com/photo/2022/04/14/14/33/sunset-7132574_1280.jpg"
  ]

  currentIndex = 0;

  prev() {
    this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
  }

  next() {
    this.currentIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
  }
}
