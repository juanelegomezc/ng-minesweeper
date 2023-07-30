import { Component, Input, OnInit } from '@angular/core';
import { MinesweeperTile } from 'src/app/models/minesweeper-tile.model';

@Component({
    selector: 'app-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.scss']
})
export class TileComponent {
    @Input()
    tile: MinesweeperTile = new MinesweeperTile();
}
