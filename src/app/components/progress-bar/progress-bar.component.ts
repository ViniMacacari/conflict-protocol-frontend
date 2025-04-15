import { Component, Input, OnDestroy, ChangeDetectorRef, NgZone, SimpleChanges, OnChanges } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnDestroy, OnChanges {
  progress = 0
  private frame: number | null = null
  private fixedProgressMode = false

  private _fixedValue = 0
  private _maxValue = 100

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) { }

  @Input() set durationInSeconds(value: number) {
    if (!this.fixedProgressMode) this.startProgress(value)
  }

  @Input() set fixedProgress(value: number) {
    this.fixedProgressMode = true
    this._fixedValue = value
    this.updateProgress()
  }

  @Input() set fixedMax(value: number) {
    this._maxValue = value || 100
    this.updateProgress()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateProgress()
  }

  private updateProgress(): void {
    if (!this.fixedProgressMode) return

    const percent = (this._fixedValue / this._maxValue) * 100
    this.progress = Math.max(0, Math.min(100, percent))
    this.cdr.detectChanges()
  }

  startProgress(duration: number): void {
    cancelAnimationFrame(this.frame!)
    this.progress = 0
    this.fixedProgressMode = false

    const start = performance.now()
    const durationMs = duration * 1000

    this.ngZone.runOutsideAngular(() => {
      const animate = (now: number) => {
        const elapsed = now - start
        this.progress = Math.min((elapsed / durationMs) * 100, 100)

        this.ngZone.run(() => this.cdr.detectChanges())

        if (this.progress < 100) {
          this.frame = requestAnimationFrame(animate)
        }
      }

      this.frame = requestAnimationFrame(animate)
    })
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame!)
  }
}