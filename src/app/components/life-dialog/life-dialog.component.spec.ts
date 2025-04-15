import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeDialogComponent } from './life-dialog.component';

describe('LifeDialogComponent', () => {
  let component: LifeDialogComponent;
  let fixture: ComponentFixture<LifeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
