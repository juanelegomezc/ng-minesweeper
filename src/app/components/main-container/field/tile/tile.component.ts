import { Component, Input, OnInit } from '@angular/core';
import { MinesweeperTile } from 'src/app/models/minesweeper-tile.model';
import { MinesweeperService } from 'src/app/services/minesweeper.service';

@Component({
    selector: 'app-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.scss']
})
export class TileComponent {
    @Input()
    tile: MinesweeperTile = new MinesweeperTile();

    constructor(private _minesweeperService: MinesweeperService) { }

    showWrongOverlay(): boolean {
        if (this._minesweeperService.isGameOver() && !this._minesweeperService.isWon()) {
            if (!this.tile.isToggled()) {
                if (this.tile.isBlocked()) {
                    return !this.tile.isMined();
                }
            }
        }
        return false;
    }

    isButton(): boolean {
        if (this._minesweeperService.isGameOver() && !this._minesweeperService.isWon()) {
            if (!this.tile.isToggled()) {
                if (this.tile.isBlocked()) {
                    return this.tile.isMined();
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return !this.tile.isToggled()
        }
    }

    getValue(): string {
        if (this._minesweeperService.isGameOver() && !this._minesweeperService.isWon()) {
            if (this.tile.isBlocked() && !this.tile.isMined()) {
                return "💣";
            }
        }
        return this.tile.value;
    }
}
