import { Injectable } from '@angular/core';
import { MinesweeperField, MinesweeperLevelProperty } from '../models/minesweeper-field.model';
import { MinesweeperTile } from '../models/minesweeper-tile.model';
import { Observable, Subject, Subscriber, Subscription, interval, map, of, timeInterval } from 'rxjs';
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
    private _newGameObservable: Subject<MinesweeperLevelProperty> = new Subject();
    private _currentLevel?: MinesweeperLevelProperty;

    constructor() { }

    public get mines(): number {
        return this._leftMines;
    }

    public get seconds(): number {
        return this._seconds;
    }

    public get newGame$(): Subject<MinesweeperLevelProperty> {
        return this._newGameObservable;
    }

    public get currentLevel(): MinesweeperLevelProperty {
        return this._currentLevel ?? MinesweeperField.LEVELS[MinesweeperField.DEFAULT_LEVEL];
    }

    public isGameOver(): boolean {
        return this._isGameOver;
    }

    public isWon(): boolean {
        return this._won;
    }

    newGame(level: MinesweeperLevelProperty): void {
        this._isGameOver = false;
        this._leftMines = level.mines;
        this._seconds = 0;
        this._currentLevel = level;
        this._timerSubscription.unsubscribe();
        this._timerSubscription = interval(1000).pipe(
            timeInterval(),
            map(interval => interval.value + 1)
        ).subscribe(seconds => {
            this._seconds = seconds;
        });
        this._won = false;
        this._field = new MinesweeperField(level.rows, level.columns, level.mines);
        this._newGameObservable.next(level);
    }

    getTiles(): Iterable<MinesweeperTile> | undefined {
        return this._field;
    }

    toggleTile(tile: MinesweeperTile): void {
        if (!this._isGameOver) {
            if (!tile.isToggled() && !tile.isBlocked()) {
                tile.toggle();
                if (tile.isMined()) {
                    // Lost game
                    this._isGameOver = true;
                    this._timerSubscription.unsubscribe();
                } else if (tile.isEmpty()) {
                    // Hit an empty cell, toggling all surronding cells.
                    tile.borders.forEach(tile => {
                        this.toggleTile(tile);
                    })
                }
                if (this._field && this._field.checkGame()) {
                    // All untoggled tiles are mines, game won
                    this._won = true;
                    this._isGameOver = true;
                    this._timerSubscription.unsubscribe();
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
