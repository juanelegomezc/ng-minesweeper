import { MinesweeperTileCoordinate } from "./minesweeper-tile-coordinate.model";
import { MinesweeperTile } from "./minesweeper-tile.model";

export class MinesweeperField implements Iterable<MinesweeperTile>{

    private _rows: number = -1;
    private _columns: number = -1;
    private _mines: number = -1;
    private _minedTiles: number[] = [];
    private _field: MinesweeperTile[][] = [];

    constructor(rows: number = - 1, columns: number = -1, mines: number = -1) {
        this._rows = rows;
        this._columns = columns;
        this._mines = mines;

        if (this._columns > 0 && this._rows > 0 && this._mines > 0) {
            this._mineField();
            this._generateField();
            this._checkField();
        }
    }

    getTileAt(row: number, column: number): MinesweeperTile {
        return this._field[row][column];
    }

    [Symbol.iterator](): Iterator<MinesweeperTile> {
        let pos = 0;
        let field = this._field;
        let columns = this._columns;
        let rows = this._rows;
        let getCoordinates = this._getCoordinates.bind(this);
        return {
            next(): IteratorResult<MinesweeperTile> {
                if (pos < rows * columns) {
                    let coordinates = getCoordinates(pos++);
                    return {
                        done: false,
                        value: field[coordinates.y][coordinates.x]
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

    private _mineField(): void {
        let max = this._rows * this._columns - 1;
        this._minedTiles = [];
        let i = 0;
        do {
            let pos = Math.floor(Math.random() * (max + 1))
            if (!this._minedTiles.find(value => value == pos)) {
                this._minedTiles.push(pos);
            }
        } while (this._minedTiles.length < this._mines)
    }

    private _generateField(): void {
        let pos = 0;
        for (let row = 0; row < this._rows; row++) {
            this._field[row] = [];
            for (let column = 0; column < this._columns; column++) {
                let isMined = this._minedTiles.find(value => value == pos) != undefined;
                let coordinates = this._getCoordinates(pos);
                let tile = new MinesweeperTile(isMined, pos, coordinates);
                this._field[row][column] = tile;
                pos++;
            }
        }
    }

    private _checkField(): void {
        for (let y = 0; y < this._rows; y++) {
            for (let x = 0; x < this._columns; x++) {
                let tile = this.getTileAt(y, x);
                this._checkBorders(tile, y, x);
            }
        }
    }

    private _checkBorders(tile: MinesweeperTile, row: number, column: number): void {
        let count = 0;
        let borders: MinesweeperTile[] = [];
        for (let y = (row - 1) < 0 ? 0 : row - 1; y <= row + 1 && y < this._rows; y++) {
            for (let x = (column - 1) < 0 ? 0 : column - 1; x <= column + 1 && x < this._columns; x++) {
                if (x == column && y == row) {
                    continue;
                }
                borders.push(this.getTileAt(y, x));
                let pos = this._getPos(y, x);
                count = this._minedTiles.find(value => value == pos) != undefined ? count + 1 : count;
            }
        }
        tile.borders = borders;
        tile.value = count;
    }

    private _getPos(row: number, column: number): number {
        return row * this._columns + column;
    }

    private _getCoordinates(pos: number): MinesweeperTileCoordinate {
        let x = pos % this._columns;
        let y = Math.floor(pos / this._columns);
        return { x, y };
    }
}