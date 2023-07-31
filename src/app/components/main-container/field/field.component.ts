import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MinesweeperField, MinesweeperLevelProperty } from 'src/app/models/minesweeper-field.model';
import { MinesweeperLevels } from 'src/app/models/minesweeper-levels.enum';
import { MinesweeperTile } from 'src/app/models/minesweeper-tile.model';
import { MinesweeperService } from 'src/app/services/minesweeper.service';

@Component({
    selector: 'app-field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnDestroy {
    width: string = "0";
    readonly TILE_SIZE: number = 30;
    private _newGameObserver?: Subscription;

    constructor(public minesweeperService: MinesweeperService) {
        this._newGameObserver = this.minesweeperService.newGame$.subscribe(level => {
            this.width = `${(this.TILE_SIZE + 1) * level.columns}px`;
        })
        this.minesweeperService.newGame(this.minesweeperService.currentLevel);
    }

    onClick(tile: MinesweeperTile): void {
        this.minesweeperService.toggleTile(tile);
    }

    onRightClick(tile: MinesweeperTile): boolean {
        this.minesweeperService.blockTile(tile);
        return false;
    }

    ngOnDestroy(): void {
        this._newGameObserver?.unsubscribe();
    }
}
