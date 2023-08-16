import { MinesweeperLevels } from "./minesweeper-levels.enum";
import { MinesweeperPerimeter } from "./minesweeper-perimeter";
import { MinesweeperTile } from "./minesweeper-tile.model";

export class MinesweeperLevelProperty {
    rows: number = -1;
    columns: number = -1;
    mines: number = -1;
}

export class MinesweeperField implements Iterable<MinesweeperTile> {

    private _rows: number = -1;
    private _columns: number = -1;
    private _mines: number = -1;
    private _field: MinesweeperTile[] = [];

    static readonly LEVELS: Record<MinesweeperLevels, MinesweeperLevelProperty> = {
        BEGINNER: {
            rows: 9,
            columns: 9,
            mines: 10
        },
        INTERMEDIATE: {
            rows: 16,
            columns: 16,
            mines: 40
        },
        EXPERT: {
            rows: 16,
            columns: 30,
            mines: 99
        }
    }

    static readonly DEFAULT_LEVEL: MinesweeperLevels = MinesweeperLevels.BEGINNER;

    constructor(level: MinesweeperLevels = MinesweeperField.DEFAULT_LEVEL) {
        let properties = MinesweeperField.LEVELS[level];
        this._rows = properties.rows;
        this._columns = properties.columns;
        this._mines = properties.mines;
        this._field = Array.from({ length: this._rows * this._columns }, (v: any, k: number) => new MinesweeperTile(k));
        this._generateField();
    }

    public get columns(): number {
        return this._columns;
    }

    public get rows(): number {
        return this._rows;
    }

    public get isActive(): boolean {
        return this._columns > 0 && this._rows > 0 && this._mines > 0;
    }

    public checkGame(): boolean {
        let notToggled = this._field.filter(tile => !tile.isToggled())
        return notToggled.length == this._mines;
    }

    public getTile(pos: number): MinesweeperTile | undefined {
        return pos >= 0 && pos < this._field.length ? this._field[pos] : undefined;
    }

    [Symbol.iterator](): Iterator<MinesweeperTile> {
        let pos = 0;
        let field = this._field;
        return {
            next(): IteratorResult<MinesweeperTile> {
                if (pos < field.length) {
                    return {
                        done: false,
                        value: field[pos++]
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
        let i = 0;
        do {
            let pos = Math.floor(Math.random() * (max + 1))
            if (!this._field[pos].isMined()) {
                this._field[pos].mined = true;
                i++;
            }
        } while (i < this._mines)
    }

    private _generateField(): void {
        this._mineField();
        this._field.forEach((tile) => {
            tile.perimeter = new MinesweeperPerimeter(tile.pos, this);
            tile.value = tile.perimeter.sum
        })
    }
}