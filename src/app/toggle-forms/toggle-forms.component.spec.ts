import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleFormsComponent } from './toggle-forms.component';

describe('ToggleFormsComponent', () => {
  let component: ToggleFormsComponent;
  let fixture: ComponentFixture<ToggleFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
