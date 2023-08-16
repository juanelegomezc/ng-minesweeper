import { Injectable } from '@angular/core';
import { MinesweeperField } from '../models/minesweeper-field.model';
import { MinesweeperTile } from '../models/minesweeper-tile.model';
import { Subject, Subscription, interval, map, timeInterval } from 'rxjs';
import { MinesweeperLevels } from '../models/minesweeper-levels.enum';

@Injectable({
    providedIn: 'root'
})
export class MinesweeperService {

    private _field?: MinesweeperField;
    private _isGameOver: boolean = false;
    private _leftMines: number = 0;
    private _timerSubscription: Subscription = new Subscription();
    private _seconds: number = 0;
    private _won: boolean = false;
    private _newGameObservable: Subject<MinesweeperLevels> = new Subject();
    private _currentLevel?: MinesweeperLevels;

    public get mines(): number {
        return this._leftMines;
    }

    public get seconds(): number {
        return this._seconds;
    }

    public get newGame$(): Subject<MinesweeperLevels> {
        return this._newGameObservable;
    }

    public get currentLevel(): MinesweeperLevels {
        return this._currentLevel ?? MinesweeperField.DEFAULT_LEVEL;
    }

    public isGameOver(): boolean {
        return this._isGameOver;
    }

    public isWon(): boolean {
        return this._won;
    }

    newGame(level?: MinesweeperLevels): void {
        if (!level && !this._currentLevel) {
            this._currentLevel = MinesweeperField.DEFAULT_LEVEL
        } else if (level) {
            this._currentLevel = level;
        }
        this._isGameOver = false;
        this._leftMines = MinesweeperField.LEVELS[this.currentLevel].mines;
        this._seconds = 0;
        this._timerSubscription.unsubscribe();
        this._timerSubscription = interval(1000).pipe(
            timeInterval(),
            map(interval => interval.value + 1)
        ).subscribe(seconds => {
            this._seconds = seconds;
        });
        this._won = false;
        this._field = new MinesweeperField(this.currentLevel);
        this._newGameObservable.next(this.currentLevel);
    }

    getTiles(): Iterable<MinesweeperTile> | undefined {
        return this._field;
    }

    toggleTile(tile: MinesweeperTile): void {
        if (!this._isGameOver) {
            if (!tile.isToggled() && !tile.isLocked()) {
                tile.toggle();
                if (tile.isMined()) {
                    // Lost game
                    this._isGameOver = true;
                    this._timerSubscription.unsubscribe();
                    return;
                } else if (tile.isEmpty()) {
                    // Hit an empty cell, toggling all surronding cells.
                    for (let perimeterTile of tile.perimeter!) {
                        this.toggleTile(perimeterTile);
                    }
                }
                if (this._field?.checkGame()) {
                    // All untoggled tiles are mines, game won
                    this._won = true;
                    this._isGameOver = true;
                    this._timerSubscription.unsubscribe();
                    return;
                }
            }
        }
    }

    blockTile(tile: MinesweeperTile): void {
        if (!this._isGameOver) {
            if (!tile.isToggled()) {
                if (tile.isLocked() || this._leftMines > 0) {
                    tile.lock = !tile.isLocked()
                    this._leftMines = tile.isLocked() ? this._leftMines - 1 : this._leftMines + 1;
                }
            }
        }
    }
}
