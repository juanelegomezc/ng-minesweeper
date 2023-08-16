import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MinesweeperField } from 'src/app/models/minesweeper-field.model';
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
    private _longPress: boolean = false;

    constructor(public minesweeperService: MinesweeperService) {
        this._newGameObserver = this.minesweeperService.newGame$.subscribe(level => {
            this.width = `${(this.TILE_SIZE + 1) * MinesweeperField.LEVELS[level].columns}px`;
        })
        this.minesweeperService.newGame(this.minesweeperService.currentLevel);
    }

    onClick(tile: MinesweeperTile): void {
        if (!this._longPress) {
            this.minesweeperService.toggleTile(tile);
        }
        this._longPress = false;
    }

    onRightClick(tile: MinesweeperTile): boolean {
        this.minesweeperService.blockTile(tile);
        return false;
    }

    onLongPress(tile: MinesweeperTile): void {
        this.minesweeperService.blockTile(tile);
        this._longPress = true;
    }

    ngOnDestroy(): void {
        this._newGameObserver?.unsubscribe();
    }
}
