import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceDialogComponent } from './dice-dialog.component';

describe('DiceDialogComponent', () => {
  let component: DiceDialogComponent;
  let fixture: ComponentFixture<DiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
