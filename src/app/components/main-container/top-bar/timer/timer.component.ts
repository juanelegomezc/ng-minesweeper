import { Component, OnInit } from '@angular/core';
import { Observable, interval, map, pipe, timeInterval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {

  seconds$: Observable<number> = interval(1000).pipe(
    timeInterval(),
    map(interval => interval.value + 1)
  )
}
