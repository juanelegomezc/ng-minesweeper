import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lcd-digit',
  templateUrl: './lcd-digit.component.html',
  styleUrls: ['./lcd-digit.component.scss']
})
export class LcdDigitComponent {
  @Input()
  value: number = 0;

  public get digit(): string {
    return `assets/lcd/d${this.value}.svg`;
  }
}
