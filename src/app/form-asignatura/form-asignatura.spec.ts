import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAsignatura } from './form-asignatura';

describe('FormAsignatura', () => {
  let component: FormAsignatura;
  let fixture: ComponentFixture<FormAsignatura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAsignatura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAsignatura);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
