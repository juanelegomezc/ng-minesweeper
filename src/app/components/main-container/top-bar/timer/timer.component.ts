import { Component, OnInit } from '@angular/core';
import { MinesweeperService } from 'src/app/services/minesweeper.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  constructor(public minesweeperService: MinesweeperService) { }
}
