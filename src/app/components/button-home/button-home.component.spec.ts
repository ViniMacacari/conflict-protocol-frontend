import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonHomeComponent } from './button-home.component';

describe('ButtonHomeComponent', () => {
  let component: ButtonHomeComponent;
  let fixture: ComponentFixture<ButtonHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
