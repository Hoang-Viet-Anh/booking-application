import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoworkingCardComponent } from './coworking-card.component';

describe('CoworkingCardComponent', () => {
  let component: CoworkingCardComponent;
  let fixture: ComponentFixture<CoworkingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoworkingCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoworkingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
