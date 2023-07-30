import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcdDigitComponent } from './lcd-digit.component';

describe('LcdDigitComponent', () => {
  let component: LcdDigitComponent;
  let fixture: ComponentFixture<LcdDigitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LcdDigitComponent]
    });
    fixture = TestBed.createComponent(LcdDigitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
