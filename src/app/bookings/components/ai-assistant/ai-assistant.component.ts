import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '@shared/components/button/button.component';
import { sendPrompt } from '@shared/store/ai-assistant/ai-assistant.actions';
import { selectPrompt, selectResponse } from '@shared/store/ai-assistant/ai-assistant.selector';
import { LucideAngularModule, Send } from 'lucide-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'booking-ai-assistant',
  imports: [CommonModule, ButtonComponent, LucideAngularModule],
  templateUrl: './ai-assistant.component.html',
  styleUrl: './ai-assistant.component.css'
})
export class AiAssistantComponent {
  readonly Send = Send;

  inputValue: string = '';

  prompt$: Observable<string | undefined>;
  response$: Observable<string | undefined>;

  @ViewChild('inputRef') inputElement!: ElementRef<HTMLInputElement>;

  exampleQuestions: string[] = [
    "How many bookings do I have?",
    "What do I have booked for the next week?",
    "List all bookings for today?",
  ];

  constructor(
    private store: Store
  ) {
    this.prompt$ = this.store.select(selectPrompt);
    this.response$ = this.store.select(selectResponse);
  }

  onInputChange($event: Event) {
    const value = ($event.target as HTMLInputElement).value;
    this.inputValue = value;
  }

  onSubmit($event: Event) {
    $event.stopPropagation();
    if (this.inputValue !== '') {
      this.store.dispatch(sendPrompt({ prompt: this.inputValue }));
      this.inputValue = '';
    }
  }

  onQuestionClick(question: string) {
    this.store.dispatch(sendPrompt({ prompt: question }));
    this.inputValue = '';
  }

  focusInput() {
    this.inputElement.nativeElement.focus();
  }
}
