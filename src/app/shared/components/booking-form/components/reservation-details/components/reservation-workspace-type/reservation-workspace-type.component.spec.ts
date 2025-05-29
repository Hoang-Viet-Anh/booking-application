import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationWorkspaceTypeComponent } from './reservation-workspace-type.component';

describe('ReservationWorkspaceTypeComponent', () => {
  let component: ReservationWorkspaceTypeComponent;
  let fixture: ComponentFixture<ReservationWorkspaceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationWorkspaceTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationWorkspaceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
