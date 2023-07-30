import { Injectable } from '@angular/core';
import { MinesweeperField } from '../models/minesweeper-field.model';
import { MinesweeperTile } from '../models/minesweeper-tile.model';

@Injectable({
    providedIn: 'root'
})
export class MinesweeperService {

    private _field: MinesweeperField = new MinesweeperField();
    private _isGameOver: boolean = false;

    constructor() { }

    public isGameOver(): boolean {
        return this._isGameOver;
    }

    newGame(rows: number, columns: number, mines: number): void {
        this._isGameOver = false;
        this._field = new MinesweeperField(rows, columns, mines);
    }

    getTiles(): Iterable<MinesweeperTile> {
        return this._field;
    }

    toggleTile(tile:MinesweeperTile): void {
        if(!this._isGameOver) {
            if(!tile.isToggled() && !tile.isBlocked()) {
                tile.toggle();
                if(tile.isMined()) {
                    this._isGameOver = true;
                    throw("Error");
                } else if(tile.isEmpty()){
                    tile.borders.forEach(tile => {
                        this.toggleTile(tile);
                    })
                }
            }
        }
    }

    blockTile(tile:MinesweeperTile): void {
        if(!this._isGameOver) {
            if(!tile.isToggled()) {
                tile.block = !tile.isBlocked()
            }
        }
    }
}
