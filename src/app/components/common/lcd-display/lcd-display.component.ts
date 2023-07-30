import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-lcd-display',
    templateUrl: './lcd-display.component.html',
    styleUrls: ['./lcd-display.component.scss']
})
export class LcdDisplayComponent {
    @Input()
    length: number = 0;
    @Input()
    value: number = 0;

    getDigitValue(pos: number): number {
        let strValue = `${this.value}`;
        let pad = this.length - strValue.length;
        if (this.length - pos > strValue.length) {
            return 0;
        }
        return parseInt(strValue.charAt(pos - pad));
    }
}
