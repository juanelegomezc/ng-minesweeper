import { Component } from '@angular/core';
import { MinesweeperService } from 'src/app/services/minesweeper.service';

@Component({
  selector: 'app-bombs-counter',
  templateUrl: './bombs-counter.component.html',
  styleUrls: ['./bombs-counter.component.scss']
})
export class BombsCounterComponent {
  constructor(public minesweeperService: MinesweeperService) { }
}
