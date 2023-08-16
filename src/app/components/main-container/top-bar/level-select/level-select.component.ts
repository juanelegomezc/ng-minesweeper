import { Component } from '@angular/core';
import { MinesweeperLevels } from 'src/app/models/minesweeper-levels.enum';
import { MinesweeperService } from 'src/app/services/minesweeper.service';

@Component({
  selector: 'app-level-select',
  templateUrl: './level-select.component.html',
  styleUrls: ['./level-select.component.scss']
})
export class LevelSelectComponent {
  selectedLevel: MinesweeperLevels = MinesweeperLevels.BEGINNER;
  public levels = Array.from({ length: Object.keys(MinesweeperLevels).length }, (v: any, k: number) => {
    let levels = Object.keys(MinesweeperLevels);
    let level = MinesweeperLevels[(levels[k] as MinesweeperLevels)]
    return {
      name: this._capitalizeFirstLetter(level.toLowerCase()),
      level: level
    };
  });

  constructor(private minesweeperService: MinesweeperService) { }

  onLevelSelect(): void {
    this.minesweeperService.newGame(this.selectedLevel)
  }

  private _capitalizeFirstLetter(str: string): string {
    return str.replace(/^\w/, (c) => c.toUpperCase());
  }
}
