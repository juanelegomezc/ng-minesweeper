import { MinesweeperTileCoordinate } from "./minesweeper-tile-coordinate.model";

export class MinesweeperTile {
    private _isMined: boolean = false;
    private _pos: number;
    private _coordinates: MinesweeperTileCoordinate;
    private _value: number = -1;
    private _isToggled: boolean = false;
    private _borders: MinesweeperTile[] = [];
    private _isBlocked: boolean = false;
    private _colors: string[] = [
        "blue",
        "green",
        "red",
        "purple",
        "maroon",
        "turquoise",
        "black",
        "grey"
    ]

    constructor(isMined: boolean = false, pos: number = -1, coordinates: MinesweeperTileCoordinate = { x: -1, y: -1 }) {
        this._isMined = isMined;
        this._pos = pos;
        this._coordinates = coordinates;
    }

    public set value(value: number) {
        this._value = value;
    }

    public get value(): string {
        if(this._isBlocked) {
            return "🚩";
        } else if (!this._isToggled) {
            return "";
        } else if (this._isMined) {
            return '💣';
        } else if (!this.isEmpty()) {
            return `${this._value}`;
        }
        return '';
    }

    public set block(block: boolean) {
        this._isBlocked = block;
    }

    public set borders(borders: MinesweeperTile[]) {
        this._borders = borders;
    }

    public get borders(): MinesweeperTile[] {
        return this._borders;
    }

    public get color(): string {
        if(!this.isToggled()) {
            return "";
        }
        return this._value > 0 ? this._colors[this._value - 1] : "";
    }

    isEmpty(): boolean {
        return this._value == 0;
    }

    isToggled(): boolean {
        return this._isToggled;
    }

    toggle(): void {
        this._isToggled = true;
    }

    isMined(): boolean {
        return this._isMined;
    }

    isBlocked(): boolean {
        return this._isBlocked;
    }
}