import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceCapacityComponent } from './workspace-capacity.component';

describe('WorkspaceCapacityComponent', () => {
  let component: WorkspaceCapacityComponent;
  let fixture: ComponentFixture<WorkspaceCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceCapacityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
