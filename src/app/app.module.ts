import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { TopBarComponent } from './components/main-container/top-bar/top-bar.component';
import { FieldComponent } from './components/main-container/field/field.component';
import { TileComponent } from './components/main-container/field/tile/tile.component';
import { BombsCounterComponent } from './components/main-container/top-bar/bombs-counter/bombs-counter.component';
import { FaceComponent } from './components/main-container/top-bar/face/face.component';
import { TimerComponent } from './components/main-container/top-bar/timer/timer.component';
import { LcdDisplayComponent } from './components/common/lcd-display/lcd-display.component';
import { LcdDigitComponent } from './components/common/lcd-display/lcd-digit/lcd-digit.component';
import { LongPressDirective } from './directives/long-press/long-press.directive';
import { LevelSelectComponent } from './components/main-container/top-bar/level-select/level-select.component';

@NgModule({
    declarations: [
        AppComponent,
        MainContainerComponent,
        TopBarComponent,
        FieldComponent,
        TileComponent,
        BombsCounterComponent,
        FaceComponent,
        TimerComponent,
        LcdDisplayComponent,
        LcdDigitComponent,
        LongPressDirective,
        LevelSelectComponent
    ],
    imports: [
        BrowserModule,
        NgSelectModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
