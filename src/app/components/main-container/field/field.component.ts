import { Component, Input, OnInit } from '@angular/core';
import { MinesweeperTile } from 'src/app/models/minesweeper-tile.model';
import { MinesweeperService } from 'src/app/services/minesweeper.service';

@Component({
    selector: 'app-field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
    @Input()
    columns: number = -1;
    @Input()
    rows: number = -1;
    @Input()
    mines: number = -1;
    width: string = "0";
    readonly TILE_SIZE: number = 30;

    constructor(public minesweeperService: MinesweeperService) { }

    ngOnInit(): void {
        this.minesweeperService.newGame(this.rows, this.columns, this.mines)
    }

    onClick(tile: MinesweeperTile): void {
        try {
            this.minesweeperService.toggleTile(tile);
        } catch(error) {
            console.log("Error");
        }
    }

    onRightClick(tile: MinesweeperTile): boolean {
        this.minesweeperService.blockTile(tile);
        return false;
    }
}
