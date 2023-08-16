import { MinesweeperPerimeter } from "./minesweeper-perimeter";

export class MinesweeperTile {
    private _isMined: boolean = false;
    private _pos: number = -1;
    private _value: number = -1;
    private _isToggled: boolean = false;
    private _perimeter?: MinesweeperPerimeter;
    private _isLocked: boolean = false;
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

    constructor(pos: number) {
        this._pos = pos;
    }

    public set value(value: number) {
        this._value = value;
    }

    public get pos(): number {
        return this._pos;
    }

    public get value(): string {
        if (this._isLocked) {
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

    public set lock(lock: boolean) {
        this._isLocked = lock;
    }

    public set perimeter(perimeter: MinesweeperPerimeter) {
        this._perimeter = perimeter;
    }

    public get perimeter(): MinesweeperPerimeter | undefined {
        return this._perimeter;
    }

    public get color(): string {
        if (!this.isToggled()) {
            return "";
        }
        return this._value > 0 ? this._colors[this._value - 1] : "";
    }

    public set mined(isMined: boolean) {
        this._isMined = isMined;
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

    isLocked(): boolean {
        return this._isLocked;
    }
}