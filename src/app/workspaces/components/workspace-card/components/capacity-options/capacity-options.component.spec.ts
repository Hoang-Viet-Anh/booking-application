import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityOptionsComponent } from './capacity-options.component';

describe('CapacityOptionsComponent', () => {
  let component: CapacityOptionsComponent;
  let fixture: ComponentFixture<CapacityOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapacityOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacityOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
