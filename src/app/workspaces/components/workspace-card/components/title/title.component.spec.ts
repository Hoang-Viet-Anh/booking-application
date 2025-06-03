import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceTitleComponent } from './title.component';

describe('WorkspaceTitleComponent', () => {
  let component: WorkspaceTitleComponent;
  let fixture: ComponentFixture<WorkspaceTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
