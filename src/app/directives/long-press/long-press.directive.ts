import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription, filter, fromEvent, map, merge, of, switchMap, timer } from 'rxjs';

@Directive({
    selector: '[longpress]'
})
export class LongPressDirective implements OnDestroy {

    private _eventSubscribe: Subscription;
    private _threshold = 500;

    @Output()
    longpress = new EventEmitter();

    constructor(private _elementRef: ElementRef) {
        const mousedown = fromEvent<MouseEvent>(_elementRef.nativeElement, 'mousedown').pipe(
            filter(event => event.button == 0),
            map(() => {
                return true;
            })
        )
        const touchstart = fromEvent(_elementRef.nativeElement, 'touchstart').pipe(map(() => true));
        const touchend = fromEvent(_elementRef.nativeElement, 'touchend').pipe(map(() => false));
        const mouseup = fromEvent<MouseEvent>(window, 'mouseup').pipe(
            filter(event => event.button == 0),
            map(() => {
                return false;
            })
        )

        this._eventSubscribe = merge(mousedown, mouseup, touchstart, touchend)
            .pipe(
                switchMap(state => state ? timer(this._threshold, -1) : of(null)),
                filter(value => value != null)
            ).subscribe(() => this.longpress.emit())
    }

    ngOnDestroy(): void {
        this._eventSubscribe?.unsubscribe();
    }

}
