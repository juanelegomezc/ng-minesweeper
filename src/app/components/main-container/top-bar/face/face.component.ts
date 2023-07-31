import { Component } from '@angular/core';
import { MinesweeperField } from 'src/app/models/minesweeper-field.model';
import { MinesweeperLevels } from 'src/app/models/minesweeper-levels.enum';
import { MinesweeperService } from 'src/app/services/minesweeper.service';

@Component({
    selector: 'app-face',
    templateUrl: './face.component.html',
    styleUrls: ['./face.component.scss']
})
export class FaceComponent {

    constructor(private _minesweeperService: MinesweeperService) { }

    public get face(): string {
        return this._minesweeperService.isGameOver() ? this._minesweeperService.isWon() ? "😎" : "😣" : "🙂";
    }

    onClick() {
        this._minesweeperService.newGame(this._minesweeperService.currentLevel);
    }
}
