import { MinesweeperField } from './minesweeper-field.model';
import { MinesweeperTile } from './minesweeper-tile.model'

export class MinesweeperPerimeter implements Iterable<MinesweeperTile>{

    _topLeft?: MinesweeperTile;
    _top?: MinesweeperTile;
    _topRight?: MinesweeperTile;
    _left?: MinesweeperTile;
    _right?: MinesweeperTile;
    _bottomLeft?: MinesweeperTile;
    _bottom?: MinesweeperTile;
    _bottomRight?: MinesweeperTile;

    _perimeter: (MinesweeperTile | undefined)[] = [];

    _sum: number = 0;

    constructor(pos: number, field: MinesweeperField) {
        this._topLeft = field.getTile(this._getTopLeftPos(pos, field.columns));
        this._top = field.getTile(this._getTopPos(pos, field.columns));
        this._topRight = field.getTile(this._getTopRightPos(pos, field.columns));
        this._left = field.getTile(this._getLeftPos(pos, field.columns));
        this._right = field.getTile(this._getRightPos(pos, field.columns));
        this._bottomLeft = field.getTile(this._getBottomLeft(pos, field.columns));
        this._bottom = field.getTile(this._getBottomPos(pos, field.columns));
        this._bottomRight = field.getTile(this._getBottomRightPos(pos, field.columns));
        this._perimeter = [
            this._topLeft,
            this._top,
            this._topRight,
            this._left,
            this._right,
            this._bottomLeft,
            this._bottom,
            this._bottomRight
        ];
        this._sum = this._perimeter.filter(tile => tile?.isMined()).reduce((sum) => sum + 1, 0);
    }
    [Symbol.iterator](): Iterator<MinesweeperTile> {
        let pos = 0;
        let perimeter = this._perimeter.filter(tile => tile != undefined);
        return {
            next(): IteratorResult<MinesweeperTile> {
                if (pos < perimeter.length) {
                    return {
                        done: false,
                        value: perimeter[pos++]!
                    }
                } else {
                    return {
                        done: true,
                        value: null
                    }
                }
            }
        }
    }

    public get sum(): number {
        return this._sum;
    }

    private _getTopLeftPos(pos: number, columns: number): number {
        return pos % columns != 0 ? this._getTopPos(pos, columns) - 1 : -1;
    }

    private _getTopPos(pos: number, columns: number): number {
        return pos - columns;
    }

    private _getTopRightPos(pos: number, columns: number): number {
        return pos % columns != columns - 1 ? this._getTopPos(pos, columns) + 1 : -1;
    }

    private _getLeftPos(pos: number, columns: number): number {
        return pos % columns != 0 ? pos - 1 : -1;
    }

    private _getRightPos(pos: number, columns: number): number {
        return pos % columns != columns - 1 ? pos + 1 : -1;
    }

    private _getBottomLeft(pos: number, columns: number): number {
        return pos % columns != 0 ? this._getBottomPos(pos, columns) - 1 : -1;
    }

    private _getBottomPos(pos: number, columns: number): number {
        return pos + columns;
    }

    private _getBottomRightPos(pos: number, columns: number): number {
        return pos % columns != columns - 1 ? this._getBottomPos(pos, columns) + 1 : -1;
    }

}