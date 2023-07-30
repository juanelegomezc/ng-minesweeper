import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BombsCounterComponent } from './bombs-counter.component';

describe('BombsCounterComponent', () => {
  let component: BombsCounterComponent;
  let fixture: ComponentFixture<BombsCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BombsCounterComponent]
    });
    fixture = TestBed.createComponent(BombsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
