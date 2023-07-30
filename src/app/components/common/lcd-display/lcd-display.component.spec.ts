import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcdDisplayComponent } from './lcd-display.component';

describe('LcdDisplayComponent', () => {
  let component: LcdDisplayComponent;
  let fixture: ComponentFixture<LcdDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LcdDisplayComponent]
    });
    fixture = TestBed.createComponent(LcdDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
