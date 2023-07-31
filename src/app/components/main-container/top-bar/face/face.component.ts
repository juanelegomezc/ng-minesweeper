import { Component } from '@angular/core';
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
        this._minesweeperService.newGame(10, 10, 10);
    }
}
