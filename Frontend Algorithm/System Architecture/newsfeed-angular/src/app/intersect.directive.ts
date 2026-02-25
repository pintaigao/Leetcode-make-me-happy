import { Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appIntersect]',
  standalone: true,
})
export class IntersectDirective implements OnInit, OnDestroy {
  @Input() rootMargin = '600px';
  @Input() threshold: number | number[] = 0;
  @Output() intersect = new EventEmitter<void>();

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            this.zone.run(() => this.intersect.emit());
          }
        },
        { root: null, rootMargin: this.rootMargin, threshold: this.threshold }
      );

      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
