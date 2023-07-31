import { Injectable } from '@angular/core';
import { MinesweeperField } from '../models/minesweeper-field.model';
import { MinesweeperTile } from '../models/minesweeper-tile.model';
import { Observable, Subscription, interval, map, timeInterval } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MinesweeperService {

    private _field: MinesweeperField = new MinesweeperField();
    private _isGameOver: boolean = false;
    private _leftMines: number = 0;
    private _timerSubscription: Subscription = new Subscription();
    private _seconds: number = 0;
    private _won: boolean = false;

    constructor() { }

    public get mines(): number {
        return this._leftMines;
    }

    public get seconds(): number {
        return this._seconds;
    }

    public isGameOver(): boolean {
        return this._isGameOver;
    }

    public isWon(): boolean {
        return this._won;
    }

    newGame(rows: number, columns: number, mines: number): void {
        this._isGameOver = false;
        this._leftMines = mines;
        this._seconds = 0;
        this._timerSubscription.unsubscribe();
        this._timerSubscription = interval(1000).pipe(
            timeInterval(),
            map(interval => interval.value + 1)
        ).subscribe(seconds => {
            this._seconds = seconds;
        });
        this._won = false;
        this._field = new MinesweeperField(rows, columns, mines);
    }

    getTiles(): Iterable<MinesweeperTile> {
        return this._field;
    }

    toggleTile(tile: MinesweeperTile): void {
        if (!this._isGameOver) {
            if (!tile.isToggled() && !tile.isBlocked()) {
                tile.toggle();
                if (tile.isMined()) {
                    this._isGameOver = true;
                    this._timerSubscription.unsubscribe();
                } else if (tile.isEmpty()) {
                    tile.borders.forEach(tile => {
                        this.toggleTile(tile);
                    })
                }
                if (this._field.checkGame()) {
                    this._isGameOver = true;
                    this._timerSubscription.unsubscribe();
                    this._won = true;
                }
            }
        }
    }

    blockTile(tile: MinesweeperTile): void {
        if (!this._isGameOver) {
            if (!tile.isToggled()) {
                if (tile.isBlocked() || this._leftMines > 0) {
                    tile.block = !tile.isBlocked()
                    this._leftMines = tile.isBlocked() ? this._leftMines - 1 : this._leftMines + 1;
                }
            }
        }
    }
}
